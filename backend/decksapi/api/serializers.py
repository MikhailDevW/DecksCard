from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

from core.models import Deck, Card


class DeckSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(slug_field='username', read_only=True)
    amount = serializers.SerializerMethodField()

    class Meta:
        fields = (
            'id', 'author', 'slug', 'title', 'description', 'cards_per_day',
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
