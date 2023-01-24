from django.urls import path, include
from .views import EmployeeViewSet, CourseViewSet, ModuleViewSet
from rest_framework import routers

employee_router = routers.SimpleRouter()
employee_router.register(r'employee', EmployeeViewSet)

course_router = routers.SimpleRouter()
course_router.register(r'course', CourseViewSet)

module_router = routers.SimpleRouter()
module_router.register(r'module', ModuleViewSet)

urlpatterns = [
    path('', include(employee_router.urls)),
    path('', include(course_router.urls)),
    path('', include(module_router.urls)),
]
