from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import CustomUser


class UserCreateReadSerializer(serializers.ModelSerializer):
    password = serializers.RegexField(
        regex=settings.USER_PASSWORD_PATTERN,
        min_length=settings.USER_PASSWORD_MIN_LENGTH,
    )

    class Meta:
        model = CustomUser
        fields = (
            'email',
            'password',
            # 'first_name',
            # 'last_name',
        )

    def create(self, validated_data):
        new_user = CustomUser.objects.create(
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            is_active=True,  # ока не работает подтверждение по почте
        )
        new_user.save()
        return new_user
