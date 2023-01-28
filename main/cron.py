import requests
from .models import Course, Module
import datetime


def update_models():
    # to check the correct execution cron-job, uncomment next line (see in /cron/django_cron.log):
    # print('cron job in ' + str(datetime.datetime.now()))

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






