# Education

Сервис для интегрциии Moodle с системами учета рабочего времени сервисного отдела.
Основная задача - учет компетенций инженеров при работе с техникой для последующего начисления премии.


# INIT DATABASE

To initialize db run:

1) docker-compose exec django python manage.py makemigrations
2) docker-compose exec django python manage.py migrate
3) docker-compose exec django python manage.py createsuperuser 


# CRON

To add all defined jobs from CRONJOBS to crontab run:
    docker exec django python manage.py crontab add 

Show current active jobs of this project:
    docker exec django python manage.py crontab show 

Removing all defined jobs:
    docker exec django python manage.py crontab remove

Inspect the log file to see cronjob outputs:
    docker exec django cat /cron/django_cron.log

# REPORTS
To build grade report in .xlsx run:
    docker exec django python manage.py build_report


