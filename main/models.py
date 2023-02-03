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



class Module(models.Model):
    name = models.TextField(unique=True, verbose_name='Название модуля')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модули'


class Course(models.Model):
    name = models.TextField(unique=True, verbose_name='Название курса')
    module = models.ForeignKey(Module, null=True, on_delete=models.SET_NULL, verbose_name='модуль курса')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курсы'


class CompletionStatus(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, verbose_name='Сотрудник')
    grade = models.FloatField(verbose_name='Оценка за курс')
    completed = models.BooleanField(null=True, verbose_name='Курс пройден')

    def __str__(self):
        return self.employee.lastname + ' ' + self.employee.firstname + ': ' + str(self.grade)

    class Meta:
        verbose_name = 'запись о прохождении курса'
        verbose_name_plural = 'записи о прохождении курсов'


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



