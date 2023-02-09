import requests
from education.settings import env
from .models import *
import datetime


def update_models():
    # to check the correct execution cron-job, uncomment next line (see in /cron/django_cron.log):
    # print('cron job in ' + str(datetime.datetime.now()))

    token = 'wstoken=' + env('WSTOKEN')


    GET_CATEGORIES_API = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=core_course_get_categories&moodlewsrestformat=json'
    GET_COURSES_API = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=core_course_get_courses&moodlewsrestformat=json'
    GET_MODULES_API = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=mod_scorm_get_scorms_by_courses&moodlewsrestformat=json'

    categories_response = requests.get(GET_CATEGORIES_API)
    courses_response = requests.get(GET_COURSES_API)

    for category in categories_response.json():

        try:
            category_entry = Category.objects.get(id=category.get('id'))
        except Category.DoesNotExist:
            category_entry = Category(id=category.get('id'))

        category_entry.name = category.get('name')

        category_entry.save()


    list_courses_for_modules = ''
    for course in courses_response.json():

        try:
            course_entry = Course.objects.get(id=course.get('id'))
        except Course.DoesNotExist:
            course_entry = Course(id=course.get('id'))

        course_entry.name = course.get('fullname')
        try:
            category = Category.objects.get(id=course.get('categoryid'))
            course_entry.category = category
        except Category.DoesNotExist:
            course_entry.category = None

        course_entry.save()
        list_courses_for_modules += '&courseids[]=' + str(course_entry.id)

    GET_MODULES_API += list_courses_for_modules
    modules_response = requests.get(GET_MODULES_API)

    for scorm in modules_response.json().get('scorms'):

        try:
            module_entry = Module.objects.get(id=scorm.get('id'))
        except Module.DoesNotExist:
            module_entry = Module(id=scorm.get('id'))

        module_entry.name = scorm.get('name')
        try:
            course = Course.objects.get(id=scorm.get('course'))
            module_entry.course = course
        except Course.DoesNotExist:
            module_entry.course = None

        module_entry.save()


    GET_COURSES_LIST_BY_USER = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=gradereport_overview_get_course_grades&moodlewsrestformat=json&'
    GET_USER_DATA = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]='
    GET_MODULES_GRADES = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=gradereport_user_get_grade_items&moodlewsrestformat=json&courseid='
    GET_MODULES_COMPLETIONS = 'http://school.tmbk.local/webservice/rest/server.php?' + token + '&wsfunction=core_completion_get_activities_completion_status&moodlewsrestformat=json&courseid='

    employees = Employee.objects.all()
    for employee in employees:
        moodle_user = requests.get(GET_USER_DATA + employee.email).json()
        for user in moodle_user.get('users'):
            moodle_user_id = user.get('id')

            user_course_list = requests.get(GET_COURSES_LIST_BY_USER + 'userid=' + str(moodle_user_id))
            user_modules_list = {}
            for course in user_course_list.json().get('grades'):
                try:
                    course_entry = Course.objects.get(id=course.get('courseid'))
                    all_course_modules = list(Module.objects.filter(course=course_entry))
                except Course.DoesNotExist:
                    continue

                for module in all_course_modules:
                    user_modules_list.update({module.id: {'grade': '0,00', 'completed': 0}})

                modules_grades = requests.get(GET_MODULES_GRADES + str(course.get('courseid')) + '&userid=' + str(moodle_user_id)).json().get('usergrades')[0]
                for module in modules_grades.get('gradeitems'):
                    if module.get('itemmodule') == 'scorm' and module.get('iteminstance') in user_modules_list:
                        user_modules_list[module.get('iteminstance')]['grade'] = module.get('gradeformatted')

                modules_completions = requests.get(GET_MODULES_COMPLETIONS + str(course.get('courseid')) + '&userid=' + str(moodle_user_id)).json().get('statuses')
                for status in modules_completions:
                    if status.get('modname') == 'scorm' and status.get('instance') in user_modules_list:
                        user_modules_list[status.get('instance')]['completed'] = status.get('state')

            current_user_completions = CompletionStatus.objects.filter(employee=employee)

            for module_id in user_modules_list.keys():
                module_entry = Module.objects.get(id=module_id)
                try:
                    module_completion_entry = current_user_completions.get(module=module_entry)
                except CompletionStatus.DoesNotExist:
                    module_completion_entry = CompletionStatus(module=module_entry, employee=employee)

                if user_modules_list[module_id]['grade'] == '-':
                    module_completion_entry.grade = 0.0
                else:
                    module_completion_entry.grade = float(user_modules_list[module_id]['grade'].replace(',', '.'))

                if user_modules_list[module_id]['completed'] in [1, 2]:
                    module_completion_entry.completed = True
                else:
                    module_completion_entry.completed = False

                module_completion_entry.save()
