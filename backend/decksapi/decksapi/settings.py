from pathlib import Path
import environ
from datetime import timedelta


env = environ.Env()
environ.Env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')
ALLOWED_HOSTS = env("ALLOWED_HOSTS").split(',')

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

PROJECT_APPS = [
    'api',
    'core',
]

THIRD_PARTY_APPS = [
    "rest_framework",
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'decksapi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'decksapi.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE'),
        'NAME': env('DB_NAME'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
AUTH_USER_MODEL = 'core.CustomUser'

LANGUAGE_CODE = env('LANGUAGE_CODE')
TIME_ZONE = env('TIME_ZONE')
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],

    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

SIMPLE_JWT = {
   'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
   'AUTH_HEADER_TYPES': ('Bearer',),
}

# DJOSER = {
#     "LOGIN_FIELD": "email",
#     "USER_CREATE_PASSWORD_RETYPE": False,
#     "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
#     "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
#     "SEND_CONFIRMATION_EMAIL": False,
#     "SET_USERNAME_RETYPE": True,
#     "SET_PASSWORD_RETYPE": False,
#     "USERNAME_RESET_CONFIRM_URL": "password/reset/confirm/{uid}/{token}",
#     "PASSWORD_RESET_CONFIRM_URL": "email/reset/confirm/{uid}/{token}",
#     "ACTIVATION_URL": "activate/{uid}/{token}",
#     "SEND_ACTIVATION_EMAIL": False,
#     "SOCIAL_AUTH_TOKEN_STRATEGY": "djoser.social.token.jwt.TokenStrategy",
#     "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": [],
#     "SERIALIZERS": {
#         "user_create": "core.serializers.UserCreateSerializer",
#         "user": "djoser.serializers.UserSerializer",
#         "current_user": "djoser.serializers.UserSerializer",
#         "user_delete": "djoser.serializers.UserSerializer",
#     },
# }
