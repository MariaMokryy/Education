# Generated by Django 4.1.5 on 2023-02-02 10:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_branch_machinetype_machinemodel_employee_branch'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='code',
            field=models.TextField(unique=True, verbose_name='Код филиала'),
        ),
        migrations.AlterField(
            model_name='branch',
            name='name',
            field=models.TextField(verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='completionstatus',
            name='completed',
            field=models.BooleanField(null=True, verbose_name='Курс пройден'),
        ),
        migrations.AlterField(
            model_name='completionstatus',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course', verbose_name='Курс'),
        ),
        migrations.AlterField(
            model_name='completionstatus',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.employee', verbose_name='Сотрудник'),
        ),
        migrations.AlterField(
            model_name='completionstatus',
            name='grade',
            field=models.FloatField(verbose_name='Оценка за курс'),
        ),
        migrations.AlterField(
            model_name='course',
            name='module',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.module', verbose_name='модуль курса'),
        ),
        migrations.AlterField(
            model_name='course',
            name='name',
            field=models.TextField(unique=True, verbose_name='Название курса'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='branch',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.branch', verbose_name='филиал сотрудника'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='code',
            field=models.TextField(unique=True, verbose_name='Код сотрудника'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='firstname',
            field=models.TextField(verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='lastname',
            field=models.TextField(verbose_name='Фамилия'),
        ),
        migrations.AlterField(
            model_name='machinemodel',
            name='code',
            field=models.TextField(unique=True, verbose_name='Код модели'),
        ),
        migrations.AlterField(
            model_name='machinemodel',
            name='machine_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.machinetype', verbose_name='Тип машины'),
        ),
        migrations.AlterField(
            model_name='machinemodel',
            name='name',
            field=models.TextField(unique=True, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='machinetype',
            name='code',
            field=models.TextField(unique=True, verbose_name='Код типа'),
        ),
        migrations.AlterField(
            model_name='machinetype',
            name='name',
            field=models.TextField(unique=True, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='module',
            name='name',
            field=models.TextField(unique=True, verbose_name='Название модуля'),
        ),
    ]