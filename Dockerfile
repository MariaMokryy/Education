FROM python:3.9-slim-bullseye

RUN apt update
RUN apt-get install cron -y

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /education_app

COPY ./requirements.txt .
COPY . .

RUN mkdir /cron
RUN touch /cron/django_cron.log

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD service cron start && python manage.py runserver 0.0.0.0:8000


