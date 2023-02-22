from django.contrib.auth.models import User
from main.models import Employee


def get_employee_by_user(user):
    user_obj = User.objects.get(pk=user.pk)
    try:
        employee_obj = Employee.objects.get(user=user_obj)
    except Employee.DoesNotExist:
        employee_obj = None

    return employee_obj
