from django.db import transaction
from rest_framework import serializers
# from rest_framework.validators import UniqueValidator
# from rest_framework.relations import SlugRelatedField

from users.serializers import UserCreateReadSerializer
from .models import Card, Deck


class DeckSerializer(serializers.ModelSerializer):
    author = UserCreateReadSerializer(
        read_only=True,
    )
    slug = serializers.SlugField(
        read_only=True)
    amount = serializers.SerializerMethodField(
        read_only=True,
    )

    class Meta:
        model = Deck
        fields = (
            'title',
            'slug',
            'description',
            'cards_per_day',
            'amount',
            'author',
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
        if 'title' in data:
            if self.context.get('request').user.decks.filter(
                title=data['title']
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
    deck = DeckSerializer(
        read_only=True,
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
            'deck',
        )

    def _get_deck_slug(self) -> str:
        return self.context.get(
            'request'
        ).parser_context.get(
            'kwargs'
        ).get('slug')

    def _get_deck(self):
        #  get oj or 404
        return self.context.get(
            'request'
        ).user.decks.get(
            slug=self._get_deck_slug()
        )

    def validate(self, data):
        if 'front_side' in data:
            if self._get_deck().cards.filter(
                front_side=data['front_side']
            ).exists():
                raise serializers.ValidationError(
                    'You have the card with same front side already.'
                )
        if 'level' in data:
            if data['level'] not in range(0, 6):
                raise serializers.ValidationError(
                    'Level should be in 0..5'
                )
        return data
