import re

from django.conf import settings
from django.core.exceptions import ValidationError


def username_validator(value: str) -> None:
    pattern = r'^[\w.@+-]+\Z'
    if re.match(pattern, value) is None:
        raise ValidationError(
            'Enter a valid username. This value may contain only letters, '
            'numbers, and @/./+/-/_ characters.'
        )


def password_validator(value: str) -> None:
    pattern = settings.USER_PASSWORD_PATTERN
    if re.match(pattern, value) is None:
        raise ValidationError(
            'Enter a valid password.'
            'It should contains at least one letter in uppercase!'
        )
