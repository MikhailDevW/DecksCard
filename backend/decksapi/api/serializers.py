from PIL import Image

from django.conf import settings
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator

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
    image = serializers.ImageField(
        max_length=None,
        use_url=True,
        allow_empty_file=True,
        required=False,
    )

    class Meta:
        fields = (
            'id',
            'front_side',
            'prompt',
            'back_side',
            'example',
            'level',
            'next_use_date',
            'image',
        )
        model = Card

    def validate_image(self, value):
        MAX_PIC_DIMENSION = (700, 700)
        try:
            with Image.open(value, formats=('PNG', 'JPEG')) as image:
                if image.size > MAX_PIC_DIMENSION:
                    raise serializers.ValidationError(
                        'Incorrect image size. SerializerValidation.'
                    )
        except TypeError:
            raise serializers.ValidationError(
                'Incorrect image format. Serializer validation.'
            )
        return value


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
        # будет допиливаться...теперь вопрос что
        # if api_settings.UPDATE_LAST_LOGIN:
        #     update_last_login(None, self.user)
        return data


class ConfirmCodeSerializer(serializers.Serializer):
    pass


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.RegexField(
        regex=r'^[\w.@+-]+\Z',
        max_length=settings.NAME_LENGTH,
        min_length=None,
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all()
            )
        ]
    )
    first_name = serializers.CharField(
        max_length=settings.NAME_LENGTH
    )

    class Meta:
        model = CustomUser
        fields = '__all__'
        exclude = (
            'id',
            'password',
            'is_superuser',
            'role',
            'groups',
            'user_permissions',
        )
        read_only_fields = ('email', 'last_login',)
