import smtplib

# from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

DUBUG_CONFIRM_URL = 'http://127.0.0.1:8000/auth/confirm/'
CONFIRM_URL = 'https://brain/auth/confirm/'


def encode_uid(pk):
    return force_str(urlsafe_base64_encode(force_bytes(pk)))


def decode_uid(pk):
    return force_str(urlsafe_base64_decode(pk))


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
