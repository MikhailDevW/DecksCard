import re

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

from core.utils import encode_uid


class UserRole(models.TextChoices):
    USER = 'USER', 'Common user'
    PREMIUM_USER = 'PREMIUM', 'Premium user'
    ADMIN = 'ADMIN', 'Site admin'
    SUPERUSER = 'SUPERUSER', 'Superuser'


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email,
        username=None,
        password=None,
        **extra_fields
    ):
        user = self.create_user(
            email,
            username,
            password=password,
            **extra_fields
        )
        user.is_active = True
        user.is_staff = True
        user.role = UserRole.SUPERUSER
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Our custom user model."""
    def username_validator(value):
        pattern = r'^[\w.@+-]+\Z'
        if re.match(pattern, value) is None:
            raise ValidationError(
                'Enter a valid username. This value may contain only letters, '
                'numbers, and @/./+/-/_ characters.'
            )

    def password_validator(value):
        pattern = settings.USER_PASSWORD_PATTERN
        if re.match(pattern, value) is None:
            raise ValidationError(
                'Enter a valid password.'
                'It should contains at least one letter in uppercase!'
            )

    email = models.EmailField(
        max_length=settings.EMAIL_LENGTH,
        unique=True)
    username = models.CharField(
        max_length=settings.NAME_LENGTH,
        unique=True,
        blank=True, null=True,
        validators=[username_validator],
    )
    password = models.CharField(
        'password',
        max_length=settings.USER_PASSWORD_MAX_LENGTH,
        validators=[password_validator],
    )
    first_name = models.CharField(
        max_length=settings.NAME_LENGTH,
        blank=True, null=True,
    )
    last_name = models.CharField(
        max_length=settings.NAME_LENGTH,
        blank=True, null=True,
    )
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=settings.USER_ROLE_LENGTH,
        choices=UserRole.choices,
        default=UserRole.USER,
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', ]

    def get_full_name(self):
        return f"{self.first_name} - {self.last_name}"

    def get_short_name(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.email


class Deck(models.Model):
    '''Данный класс описывает таблицу колод карточек.'''
    title = models.CharField(
        max_length=settings.DECK_TITLE_LENGTH,
        verbose_name='Title',
    )
    slug = models.SlugField(
        unique=True,
        max_length=settings.DECK_SLUG_LENGTH,
    )
    description = models.TextField(
        blank=True,
    )
    cards_per_day = models.PositiveIntegerField(
        default=settings.CARDS_PER_DAY_DEFAULT,
        verbose_name='Amount per day',
    )
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='decks'
    )

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        super(Deck, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = encode_uid(self.id)
            self.save()

    class Mets:
        verbose_name = 'Deck'
        verbose_name_plural = 'Decks'


class Card(models.Model):
    '''
    Данный класс модели поисывает карточку,
    которую видит пользватель.
    '''
    front_side = models.CharField(
        max_length=settings.CARD_MAX_LENGTH,
        verbose_name='Front',
    )
    prompt = models.CharField(
        max_length=settings.CARD_MAX_LENGTH,
        verbose_name='Definition',
        blank=True, null=True,
    )
    back_side = models.CharField(
        max_length=settings.CARD_MAX_LENGTH,
        verbose_name='Answer',
    )
    audio = models.FileField(
        upload_to='audio/',
        blank=True, null=True,
    )
    example = models.TextField(
        blank=True,
        verbose_name='Example',
    )
    '''скрытые поля'''
    pub_date = models.DateTimeField(
        auto_now_add=True,
    )
    next_use_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='next appears date',
    )
    level = models.PositiveIntegerField(
        default=0,
        verbose_name='level',
    )

    deck = models.ForeignKey(
        Deck,
        on_delete=models.CASCADE,
        related_name='cards',
    )

    def __str__(self) -> str:
        return self.front_side

    class Mets:
        ordering = ('-next_use_date',)
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'
