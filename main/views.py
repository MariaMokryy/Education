from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .models import Employee, Course, Category
from .serializers import EmployeeSerializer, CourseSerializer, ModuleSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = ModuleSerializer


