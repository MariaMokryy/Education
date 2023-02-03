import requests
from .models import *
import datetime


def update_models():
    # to check the correct execution cron-job, uncomment next line (see in /cron/django_cron.log):
    print('cron job in ' + str(datetime.datetime.now()))

    GET_MODULES_API = 'http://school.tmbk.local/webservice/rest/server.php?wstoken=78e11184c6d1ea686efb457448e69baa&wsfunction=core_course_get_categories&moodlewsrestformat=json'

    GET_COURSES_API = 'http://school.tmbk.local/webservice/rest/server.php?wstoken=78e11184c6d1ea686efb457448e69baa&wsfunction=core_course_get_courses&moodlewsrestformat=json'

    modules_response = requests.get(GET_MODULES_API)
    courses_response = requests.get(GET_COURSES_API)

    for module in modules_response.json():

        try:
            module_entry = Module.objects.get(id=module.get('id'))
        except Module.DoesNotExist:
            module_entry = Module(id=module.get('id'))

        module_entry.name = module.get('name')

        module_entry.save()

    for course in courses_response.json():

        try:
            course_entry = Course.objects.get(id=course.get('id'))
        except Course.DoesNotExist:
            course_entry = Course(id=course.get('id'))

        course_entry.name = course.get('fullname')
        try:
            module = Module.objects.get(id=course.get('categoryid'))
            course_entry.module = module
        except Module.DoesNotExist:
            course_entry.module = None

        course_entry.save()



    GET_COURSES_LIST_BY_USER = 'http://school.tmbk.local/webservice/rest/server.php?wstoken=78e11184c6d1ea686efb457448e69baa&wsfunction=gradereport_overview_get_course_grades&moodlewsrestformat=json&'
    GET_COURSE_COMPLETION_BY_USER = 'http://school.tmbk.local/webservice/rest/server.php?wstoken=78e11184c6d1ea686efb457448e69baa&wsfunction=core_completion_get_course_completion_status&moodlewsrestformat=json&'

    # email_list = Employee.objects.values_list('email')

    employees = Employee.objects.all()
    for employee in employees:
        moodle_user = requests.get('http://school.tmbk.local/webservice/rest/server.php?wstoken=78e11184c6d1ea686efb457448e69baa&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=' + employee.email).json()
        for user in moodle_user.get('users'):
            moodle_user_id = user.get('id')

            user_course_list = requests.get(GET_COURSES_LIST_BY_USER + 'userid=' + str(moodle_user_id))
            current_user_completions = CompletionStatus.objects.filter(employee=employee)

            for course in user_course_list.json().get('grades'):
                course_entry = Course.objects.get(id=course.get('courseid'))
                try:
                    course_completion_entry = current_user_completions.get(course=course_entry)
                except CompletionStatus.DoesNotExist:
                    course_completion_entry = CompletionStatus(course=course_entry, employee=employee)

                if course.get('grade') == '-':
                    course_completion_entry.grade = 0.0
                else:
                    course_completion_entry.grade = float(course.get('grade').replace(',', '.'))

                is_completed_course = requests.get(GET_COURSE_COMPLETION_BY_USER + 'courseid=' + str(course.get('courseid')) + '&userid=' + str(moodle_user_id)).json()

                if is_completed_course.get('errorcode') == 'nocriteriaset':
                    course_completion_entry.completed = None
                else:
                    course_completion_entry.completed = is_completed_course.get('completionstatus').get('completed')

                course_completion_entry.save()









