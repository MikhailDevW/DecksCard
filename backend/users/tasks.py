import smtplib

from celery import shared_task
from django.core.mail import send_mail

CONFIRM_URL = 'https://brain/auth/confirm/'


@shared_task()
def add(x, y):
    return x + y


@shared_task()
def send_confirmation_email(
    to,
    uid,
    code,
    subject='Добро пожаловать!',
):
    from_email = 'braindeckssite@gmail.com'
    try:
        send_mail(
            subject,
            CONFIRM_URL + f'{uid}/{code}/',
            from_email,
            [to],
            fail_silently=False,
        )
    except smtplib.SMTPAuthenticationError as auth_error:
        print(auth_error)
        # return False
    except Exception:
        print('err')
        # return False
    # else:
        # return True
