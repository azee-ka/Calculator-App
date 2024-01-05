import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_CONFIG = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': 'localhost',
        'PORT': os.environ.get('DB_PORT'),
    }
}

DJANGO_SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'default-secret-key')