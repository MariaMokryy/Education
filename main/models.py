from django.db import models
from django.contrib.auth.models import User


class Branch(models.Model):
    code = models.TextField(unique=True, verbose_name='Код филиала')
    name = models.TextField(verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'филиал'
        verbose_name_plural = 'филиалы'


class Employee(models.Model):
    code = models.TextField(unique=True, verbose_name='Код сотрудника')
    email = models.TextField(unique=True)
    firstname = models.TextField(verbose_name='Имя')
    lastname = models.TextField(verbose_name='Фамилия')
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, null=True, on_delete=models.SET_NULL, verbose_name='филиал сотрудника')

    def __str__(self):
        return self.firstname + ' ' + self.lastname

    class Meta:
        verbose_name = 'сотрудник'
        verbose_name_plural = 'сотрудники'
        permissions = [
            ("read_branch_employees", "Can view data only self branch employees"),
        ]


class Category(models.Model):
    name = models.TextField(unique=True, verbose_name='Название категории')
    image = models.ImageField(null=True, blank=True, upload_to='categories/', height_field=None, width_field=None, verbose_name='Изображение')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'


class CourseLevel(models.Model):
    name = models.TextField(unique=True, verbose_name='Название уровня')
    award = models.IntegerField(null=False, default=0, verbose_name='Размер премии (руб.)')

    def __str__(self):
        return self.name + ': ' + str(self.award) + ' руб.'

    class Meta:
        verbose_name = 'уровень прохождения'
        verbose_name_plural = 'уровни прохождения'


class Course(models.Model):
    name = models.TextField(unique=True, verbose_name='Название курса')
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, verbose_name='Категория курса')
    level = models.ForeignKey(CourseLevel, null=True, on_delete=models.SET_NULL, verbose_name='Уровень прохождения курса')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курсы'


class Module(models.Model):
    name = models.TextField(unique=True, verbose_name='Название модуля')
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE, verbose_name='Курс модуля')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модули'


class ModuleCompletionStatus(models.Model):
    module = models.ForeignKey(Module, null=True, on_delete=models.CASCADE, verbose_name='Модуль')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, verbose_name='Сотрудник')
    grade = models.DecimalField(verbose_name='Оценка за модуль', max_digits=5, decimal_places=2)
    completed = models.BooleanField(null=True, verbose_name='Модуль пройден')

    @property
    def get_module_name(self):
        return self.module.name

    @property
    def get_course(self):
        return self.module.course.id

    def __str__(self):
        return self.employee.lastname + ' ' + self.employee.firstname + ': ' + str(self.grade)

    class Meta:
        verbose_name = 'запись о прохождении модуля'
        verbose_name_plural = 'записи о прохождении модулей'
        permissions = [
            ("read_self_module_records", "Can view self module completions"),
            ("read_branch_employees_module_records", "Can view branch employees module completions"),
        ]


class CourseCompletionStatus(models.Model):
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE, verbose_name='Курс')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, verbose_name='Сотрудник')
    grade = models.DecimalField(verbose_name='Оценка за курс', max_digits=5, decimal_places=2)
    completed = models.BooleanField(null=True, verbose_name='Курс пройден')

    @property
    def get_award(self):
        return self.course.level.award

    @property
    def get_category(self):
        return self.course.category.id

    @property
    def get_course_name(self):
        return self.course.name

    def __str__(self):
        return self.employee.lastname + ' ' + self.employee.firstname + ': ' + str(self.grade)

    class Meta:
        verbose_name = 'запись о прохождении курса'
        verbose_name_plural = 'записи о прохождении курсов'
        permissions = [
            ("read_self_course_records", "Can view self course completions"),
            ("read_branch_employees_course_records", "Can view branch employees course completions"),
        ]


class MachineType(models.Model):
    code = models.TextField(unique=True, verbose_name='Код типа')
    name = models.TextField(unique=True, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'тип машины'
        verbose_name_plural = 'типы машин'


class MachineModel(models.Model):
    code = models.TextField(unique=True, verbose_name='Код модели')
    name = models.TextField(unique=True, verbose_name='Название')
    machine_type = models.ForeignKey(MachineType, null=True, on_delete=models.SET_NULL, verbose_name='Тип машины')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'модель машины'
        verbose_name_plural = 'модели машин'



