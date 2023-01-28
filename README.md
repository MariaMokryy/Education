
#INIT DATABASE

To initialize db run:

1) docker-compose exec web python manage.py makemigrations
2) docker-compose exec web python manage.py migrate
3) docker-compose exec web python manage.py createsuperuser 


#CRON#

To add all defined jobs from CRONJOBS to crontab run:
    docker exec web python manage.py crontab add 

Show current active jobs of this project:
    docker exec web python manage.py crontab show 

Removing all defined jobs:
    docker exec web python manage.py crontab remove

Inspect the log file to see cronjob outputs:
    docker exec web cat /cron/django_cron.log


