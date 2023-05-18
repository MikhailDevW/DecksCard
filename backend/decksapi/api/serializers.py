from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

from core.models import Deck


class DeckSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        fields = ('id', 'author', 'slug', 'title', 'description', 'cards_per_day',)
        model = Deck
