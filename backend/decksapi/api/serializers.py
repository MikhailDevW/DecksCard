from django.conf import settings
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import Card, CustomUser, Deck


class DeckSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(slug_field='email', read_only=True)
    amount = serializers.SerializerMethodField()
    slug = serializers.SlugField(read_only=True)

    class Meta:
        fields = (
            'slug', 'author', 'title', 'description', 'cards_per_day',
            'amount',
        )
        model = Deck

    def get_amount(self, obj):
        return obj.cards.all().count()


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 'front_side', 'prompt', 'back_side', 'example', 'level'
        )
        model = Card


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.RegexField(
        regex=settings.USER_PASSWORD_PATTERN,
        min_length=settings.USER_PASSWORD_MIN_LENGTH
    )

    class Meta:
        fields = ('email', 'password', 'first_name', 'last_name')
        model = CustomUser


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        access = self.get_token(self.user)
        data['access'] = str(access.access_token)
        # будет допиливаться
        # if api_settings.UPDATE_LAST_LOGIN:
        #     update_last_login(None, self.user)
        return data


class ConfirmCodeSerializer(serializers.Serializer):
    pass
