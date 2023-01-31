from django.contrib import admin
from .models import Employee, Module, Course, CompletionStatus

admin.site.register(Employee)

admin.site.register(Module)

admin.site.register(Course)

admin.site.register(CompletionStatus)