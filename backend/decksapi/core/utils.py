from django.core.mail import send_mail


class Mail:
    def __init__(self, to, code) -> None:
        self.subject = 'Welcome message.'
        self.from_email = 'from@example.com'
        self.to = to
        self.code = code

    def send_message(self):
        send_mail(
            self.subject,
            f'Ваш код: {self.code}',
            self.from_email,
            [self.to],
            fail_silently=False,
        )
