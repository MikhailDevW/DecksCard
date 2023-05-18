from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

from core.models import Deck, Card


class DeckSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        fields = (
            'id', 'author', 'slug', 'title', 'description', 'cards_per_day',
        )
        model = Deck


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'front_side', 'prompt', 'back_side', 'example')
        model = Card
