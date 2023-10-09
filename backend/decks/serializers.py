from django.db import transaction
from rest_framework import serializers
# from rest_framework.relations import SlugRelatedField
# from rest_framework.validators import UniqueValidator

from users.serializers import UserCreateReadSerializer
from .models import Card, Deck


class DeckSerializer(serializers.ModelSerializer):
    author = UserCreateReadSerializer(
        read_only=True,
    )
    slug = serializers.SlugField(read_only=True)
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Deck
        fields = (
            'slug',
            'author',

            'title',
            'description',
            'cards_per_day',
            'amount',
        )

    def get_amount(self, obj):
        return obj.cards.all().count()

    @transaction.atomic
    def create(self, validated_data):
        author = self.context.get('request').user
        new_deck = Deck.objects.create(
            author=author,
            **validated_data,
        )
        return new_deck

    def validate(self, data):
        if Deck.objects.filter(
            author=self.context.get('request').user,
            title=data['title'],
        ).exists():
            raise serializers.ValidationError(
                'You have the deck with same title already.'
            )
        if 'cards_per_day' in data and data['cards_per_day'] <= 0:
            raise serializers.ValidationError(
                'Should be more than 0.'
            )
        return data


class CardSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None,
        use_url=True,
        allow_empty_file=True,
        required=False,
    )

    class Meta:
        model = Card
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


# class SignUpSerializer(serializers.ModelSerializer):
#     password = serializers.RegexField(
#         regex=settings.USER_PASSWORD_PATTERN,
#         min_length=settings.USER_PASSWORD_MIN_LENGTH,
#     )

#     class Meta:
#         fields = (
#             'email',
#             'password',
#             'first_name',
#             'last_name',
#         )
#         model = CustomUser


#  class ProfileSerializer(serializers.ModelSerializer):
#     username = serializers.RegexField(
#         regex=r'^[\w.@+-]+\Z',
#         max_length=settings.NAME_LENGTH,
#         min_length=None,
#         validators=[
#             UniqueValidator(
#                 queryset=CustomUser.objects.all()
#             )
#         ]
#     )
#     first_name = serializers.CharField(
#         max_length=settings.NAME_LENGTH
#     )

#     class Meta:
#         model = CustomUser
#         fields = (
#             'username',
#             'first_name',
#             'last_login',
#             'email',
#         )
#         read_only_fields = (
#             'email',
#             'last_login',
#         )


# class ChangePasswordSerializer(serializers.ModelSerializer):
#     """
#     !!!
#     Данный сериализатор не реализован.
#     Требуется доработка в части сравнения пароля.
#     !!!
#     """
#     # password = serializers.RegexField(
#     #     regex=settings.USER_PASSWORD_PATTERN,
#     #     min_length=settings.USER_PASSWORD_MIN_LENGTH,
#     # )

#     class Meta:
#         fields = (
#             'password',
#         )
#         model = CustomUser

#     def validate_password(self, value):
#         old_password = self.context.get('request').user.password
#         confirm_password = make_password(value)
#         if old_password != confirm_password:
#             raise serializers.ValidationError(
#                 'Nicht!!!'
#             )
#         # if (
#         #     re.match(settings.USER_PASSWORD_PATTERN, value) is None
#         # ):
#         #     raise serializers.ValidationError(
#         #         'Enter a valid password.'
#         #         'It should contains at least one letter in uppercase!'
#         #     )
#         return value
