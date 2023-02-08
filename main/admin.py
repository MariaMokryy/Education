from django.contrib import admin
from .models import *
from import_export import resources
from import_export.fields import Field
from import_export.widgets import ForeignKeyWidget
from import_export.admin import ImportExportModelAdmin

admin.site.register(Category)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
admin.site.register(Course, CourseAdmin)


class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'course')
admin.site.register(Module, ModuleAdmin)


class CompletionStatusAdmin(admin.ModelAdmin):
    list_display = ('employee', 'module', 'completed', 'grade')
admin.site.register(CompletionStatus, CompletionStatusAdmin)

class MachineTypeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')
admin.site.register(MachineType, MachineTypeAdmin)

class MachineModelAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'machine_type')
admin.site.register(MachineModel, MachineModelAdmin)

class EmployeeResource(resources.ModelResource):

    branch = Field(
        column_name="branch",
        attribute="branch",
        widget=ForeignKeyWidget(Branch, 'code')
    )

    class Meta:
        model = Employee
        skip_unchanged = True
        report_skipped = False
        import_id_fields = ('code',)
        fields = ('code', 'email', 'firstname', 'lastname', 'branch')
        export_order = ('code', 'email', 'firstname', 'lastname', 'branch')


class EmployeeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_classes = [EmployeeResource]
    list_display = ('code', 'email', 'firstname', 'lastname', 'branch')

admin.site.register(Employee, EmployeeAdmin)



class BranchResource(resources.ModelResource):
    class Meta:
        model = Branch
        import_id_fields = ('code',)
        fields = ('code', 'name')


class BranchAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_classes = [BranchResource]
    list_display = ('code', 'name')

admin.site.register(Branch, BranchAdmin)





