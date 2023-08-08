from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


def encode_uid(pk):
    return force_str(urlsafe_base64_encode(force_bytes(pk)))


def decode_uid(pk):
    return force_str(urlsafe_base64_decode(pk))


class Mail:
    def __init__(self, to, uid, code) -> None:
        self.subject = 'Welcome message.'
        self.from_email = 'jobhunt21@yandex.ru'
        self.to = to
        self.uid = uid
        self.code = code

    def send_message(self):
        send_mail(
            self.subject,
            f'http://127.0.0.1:8000/api/v1/auth/confirm/{self.uid}/{self.code}/',
            self.from_email,
            [self.to],
            fail_silently=False,
        )
