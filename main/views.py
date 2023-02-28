from rest_framework import viewsets

from .scripts.helpers import get_employee_by_user
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer


class ModuleCompletionStatusViewSet(viewsets.ModelViewSet):
    queryset = ModuleCompletionStatus.objects.all()
    serializer_class = ModuleCompletionStatusSerializer


class CourseCompletionStatusViewSet(viewsets.ModelViewSet):
    queryset = CourseCompletionStatus.objects.all()
    serializer_class = CourseCompletionStatusSerializer


class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer


@api_view(['GET'])
def get_branch_employees(request):
    if request.user.has_perm('main.read_branch_employees'):
        employee_obj = get_employee_by_user(request.user)
        employees_entries = Employee.objects.filter(branch=employee_obj.branch)
        serializer = EmployeeSerializer(employees_entries, many=True)
        return Response({'employees': serializer.data})
    else:
        return Response("Access denied! You don't have enough permissions!")


@api_view(['GET'])
def get_self_modules_completions(request):
    if request.user.has_perm('main.read_self_module_records'):
        employee_obj = get_employee_by_user(request.user)
        completion_entries = ModuleCompletionStatus.objects.filter(employee=employee_obj)
        serializer = ModuleCompletionStatusSerializer(completion_entries, many=True)
        return Response({'modules_completions': serializer.data})
    else:
        return Response("Access denied! You don't have enough permissions!")


@api_view(['GET'])
def get_branch_modules_completions(request):
    if request.user.has_perm('main.read_branch_employees_module_records'):
        employee_obj = get_employee_by_user(request.user)
        completion_entries = ModuleCompletionStatus.objects.filter(employee__branch=employee_obj.branch)
        serializer = ModuleCompletionStatusSerializer(completion_entries, many=True)
        return Response({'modules_completions': serializer.data})
    else:
        return Response("Access denied! You don't have enough permissions!")


@api_view(['GET'])
def get_self_courses_completions(request):
    if request.user.has_perm('main.read_self_course_records'):
        employee_obj = get_employee_by_user(request.user)
        completion_entries = CourseCompletionStatus.objects.filter(employee=employee_obj)
        serializer = CourseCompletionStatusSerializer(completion_entries, many=True)
        return Response({'courses_completions': serializer.data})
    else:
        return Response("Access denied! You don't have enough permissions!")


@api_view(['GET'])
def get_branch_courses_completions(request):
    if request.user.has_perm('main.read_branch_employees_course_records'):
        employee_obj = get_employee_by_user(request.user)
        completion_entries = CourseCompletionStatus.objects.filter(employee__branch=employee_obj.branch)
        serializer = CourseCompletionStatusSerializer(completion_entries, many=True)
        return Response({'courses_completions': serializer.data})
    else:
        return Response("Access denied! You don't have enough permissions!")



