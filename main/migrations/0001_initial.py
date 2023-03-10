# Generated by Django 4.1.5 on 2023-02-22 18:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField(unique=True, verbose_name='Код филиала')),
                ('name', models.TextField(verbose_name='Название')),
            ],
            options={
                'verbose_name': 'филиал',
                'verbose_name_plural': 'филиалы',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True, verbose_name='Название категории')),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories/', verbose_name='Изображение')),
            ],
            options={
                'verbose_name': 'категория',
                'verbose_name_plural': 'категории',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True, verbose_name='Название курса')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.category', verbose_name='Категория курса')),
            ],
            options={
                'verbose_name': 'курс',
                'verbose_name_plural': 'курсы',
            },
        ),
        migrations.CreateModel(
            name='CourseLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True, verbose_name='Название уровня')),
                ('award', models.IntegerField(default=0, verbose_name='Размер премии (руб.)')),
            ],
            options={
                'verbose_name': 'уровень прохождения',
                'verbose_name_plural': 'уровни прохождения',
            },
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField(unique=True, verbose_name='Код сотрудника')),
                ('email', models.TextField(unique=True)),
                ('firstname', models.TextField(verbose_name='Имя')),
                ('lastname', models.TextField(verbose_name='Фамилия')),
                ('branch', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.branch', verbose_name='филиал сотрудника')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'сотрудник',
                'verbose_name_plural': 'сотрудники',
                'permissions': [('read_branch_employees', 'Can view data only self branch employees')],
            },
        ),
        migrations.CreateModel(
            name='MachineType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField(unique=True, verbose_name='Код типа')),
                ('name', models.TextField(unique=True, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'тип машины',
                'verbose_name_plural': 'типы машин',
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True, verbose_name='Название модуля')),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.course', verbose_name='Курс модуля')),
            ],
            options={
                'verbose_name': 'модуль',
                'verbose_name_plural': 'модули',
            },
        ),
        migrations.CreateModel(
            name='ModuleCompletionStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Оценка за модуль')),
                ('completed', models.BooleanField(null=True, verbose_name='Модуль пройден')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.employee', verbose_name='Сотрудник')),
                ('module', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.module', verbose_name='Модуль')),
            ],
            options={
                'verbose_name': 'запись о прохождении модуля',
                'verbose_name_plural': 'записи о прохождении модулей',
                'permissions': [('read_self_module_records', 'Can view self module completions'), ('read_branch_employees_module_records', 'Can view branch employees module completions')],
            },
        ),
        migrations.CreateModel(
            name='MachineModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField(unique=True, verbose_name='Код модели')),
                ('name', models.TextField(unique=True, verbose_name='Название')),
                ('machine_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.machinetype', verbose_name='Тип машины')),
            ],
            options={
                'verbose_name': 'модель машины',
                'verbose_name_plural': 'модели машин',
            },
        ),
        migrations.CreateModel(
            name='CourseCompletionStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Оценка за курс')),
                ('completed', models.BooleanField(null=True, verbose_name='Курс пройден')),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.course', verbose_name='Курс')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.employee', verbose_name='Сотрудник')),
            ],
            options={
                'verbose_name': 'запись о прохождении курса',
                'verbose_name_plural': 'записи о прохождении курсов',
                'permissions': [('read_self_course_records', 'Can view self course completions'), ('read_branch_employees_course_records', 'Can view branch employees course completions')],
            },
        ),
        migrations.AddField(
            model_name='course',
            name='level',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.courselevel', verbose_name='Уровень прохождения курса'),
        ),
    ]
