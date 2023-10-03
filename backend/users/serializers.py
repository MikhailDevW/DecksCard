import logging

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser

logger = logging.getLogger(__name__)


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    """
    [POST] Serializer to obtain token for custom user.
    """
    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)

        # Add custom claim
        token['role'] = user.role
        return token

    def validate(self, data):
        data = super().validate(data)
        access = MyTokenObtainPairSerializer.get_token(self.user)
        data['access'] = str(access.access_token)
        update_last_login(None, self.user)
        return data


class ChangeCurrentPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={'input_type': 'password'})
    new_password = serializers.RegexField(
        regex=settings.USER_PASSWORD_PATTERN,
        min_length=settings.USER_PASSWORD_MIN_LENGTH,
    )

    default_error_messages = {
        'invalid_password': 'Invalid password!'
    }

    def validate_current_password(self, value):
        is_password_valid = self.context['request'].user.check_password(value)
        if is_password_valid:
            return value
        else:
            raise serializers.ValidationError(
                'Invalid password!'
            )
            # self.fail('invalid_password')


class UserCreateReadSerializer(serializers.ModelSerializer):
    password = serializers.RegexField(
        regex=settings.USER_PASSWORD_PATTERN,
        min_length=settings.USER_PASSWORD_MIN_LENGTH,
        write_only=True,
    )

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'password',
            'username',

            'first_name',
            'last_name',
        )
        read_only_field = ('first_name', 'last_name',)

    def create(self, validated_data) -> CustomUser:
        new_user = CustomUser.objects.create(
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            is_active=True,  # пока не работает подтверждение по почте
        )
        new_user.save()
        return new_user

    def validate(self, attrs):
        return super().validate(attrs)
