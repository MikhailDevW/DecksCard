from django.core.mail import send_mail

CONFIRM_URL = '11'


def send_confirmation_email(subject, *args, **kwargs):
    pass
    # send_mail(
    #     subject,
    #     CONFIRM_URL + f'{uid}/{code}/',
    #     from_email,
    #     [self.to],
    #     fail_silently=False,
    # )
