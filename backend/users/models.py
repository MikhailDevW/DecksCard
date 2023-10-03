from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.conf import settings

from .validators import password_validator, username_validator


class UserRole(models.TextChoices):
    USER = 'USER', 'Common user'
    PREMIUM_USER = 'PREMIUM', 'Premium user'
    ADMIN = 'ADMIN', 'Site admin'
    SUPERUSER = 'SUPERUSER', 'Superuser'


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, username=None, **extra_fields):
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
    email = models.EmailField(
        'email',
        max_length=settings.EMAIL_LENGTH,
        unique=True,
        db_index=True,
    )
    username = models.CharField(
        'username',
        max_length=settings.NAME_LENGTH,
        unique=True,
        blank=True, null=True,
        db_index=True,
        validators=[username_validator],
    )
    password = models.CharField(
        'password',
        max_length=settings.USER_PASSWORD_MAX_LENGTH,
        validators=[password_validator],
    )
    first_name = models.CharField(
        'user first name',
        max_length=settings.NAME_LENGTH,
        blank=True, null=True,
    )
    last_name = models.CharField(
        'user last name',
        max_length=settings.NAME_LENGTH,
        blank=True, null=True,
    )
    is_active = models.BooleanField(
        'user active status',
        default=True,
    )
    role = models.CharField(
        'user role',
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
