from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    code = models.TextField(unique=True)
    email = models.TextField(unique=True)
    firstname = models.TextField()
    lastname = models.TextField()
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.firstname + ' ' + self.lastname

    class Meta:
        verbose_name = 'сотрудник'
        verbose_name_plural = 'сотрудники'


class Module(models.Model):
    name = models.TextField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модули'


class Course(models.Model):
    name = models.TextField(unique=True)
    module = models.ForeignKey(Module, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курсы'

