from rest_framework import serializers
from .models import *


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    completion_award = serializers.ReadOnlyField(source='get_award_value')

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'category',
            'completion_award'
        ]


class ModuleSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='get_category')

    class Meta:
        model = Module
        fields = [
            'id',
            'name',
            'course',
            'category'
        ]


class ModuleCompletionStatusSerializer(serializers.ModelSerializer):
    module_name = serializers.ReadOnlyField(source='get_module_name')
    course = serializers.ReadOnlyField(source='get_course')

    class Meta:
        model = ModuleCompletionStatus
        fields = [
            'id',
            'module',
            'employee',
            'grade',
            'completed',
            'module_name',
            'course'
        ]


class CourseCompletionStatusSerializer(serializers.ModelSerializer):
    award = serializers.ReadOnlyField(source='get_award')
    category = serializers.ReadOnlyField(source='get_category')
    course_name = serializers.ReadOnlyField(source='get_course_name')

    class Meta:
        model = CourseCompletionStatus
        fields = [
            'id',
            'course',
            'employee',
            'grade',
            'completed',
            'award',
            'category',
            'course_name'
        ]


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"
