
# to create local_settings.py file you should copy this one and change fields USER, NAME and PASSWORD

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': ''
    }
}

DEBUG = True


