from django.urls import path, include
from rest_framework import routers
from . import views

employee_router = routers.SimpleRouter()
employee_router.register(r'employee', views.EmployeeViewSet)

category_router = routers.SimpleRouter()
category_router.register(r'category', views.CategoryViewSet)

course_router = routers.SimpleRouter()
course_router.register(r'course', views.CourseViewSet)

module_router = routers.SimpleRouter()
module_router.register(r'module', views.ModuleViewSet)

course_completion_router = routers.SimpleRouter()
course_completion_router.register(r'course_completions', views.CourseCompletionStatusViewSet)

module_completion_router = routers.SimpleRouter()
module_completion_router.register(r'module_completions', views.ModuleCompletionStatusViewSet)

branch_router = routers.SimpleRouter()
branch_router.register(r'branch', views.BranchViewSet)


urlpatterns = [
    path('', include(employee_router.urls)),
    path('', include(category_router.urls)),
    path('', include(course_router.urls)),
    path('', include(module_router.urls)),
    path('', include(course_completion_router.urls)),
    path('', include(module_completion_router.urls)),
    path('', include(branch_router.urls)),


    path('employee/branch', views.get_branch_employees),

    path('module_completions/self', views.get_self_modules_completions),
    path('course_completions/self', views.get_self_courses_completions),

    path('module_completions/branch', views.get_branch_modules_completions),
    path('course_completions/branch', views.get_branch_courses_completions),
]
