from datetime import date

from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Deck
from .paginators import CustomPaginator
from .permissions import OwnerOnly
from .serializers import CardSerializer, DeckSerializer
from .utils import decode_uid


class DashboardViewSet(viewsets.ModelViewSet):
    """
    Methods:
    - GET: get all the decks user has;
    - POST: create new deck:
    - PATCH: change the decks setting
    - DELETE: the deck.
    Only owner can edit the Deck.
    """
    serializer_class = DeckSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPaginator

    def get_queryset(self):
        return (
            self.request.user.decks.select_related('author').all()
        )


class CardsViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer

    def _get_deck(self):
        return get_object_or_404(
            Deck,
            id=decode_uid(self.kwargs.get('slug'))
        )

    def get_queryset(self):
        return self._get_deck().cards.filter(
            next_use_date__date__lte=date.today()
        )

    def perform_create(self, serializer):
        serializer.save(deck=self._get_deck())

    @action(
        methods=['get'],
        detail=False,
        permission_classes=(OwnerOnly,),
        url_path='all',
        url_name='all'
    )
    def all(self, request, *args, **kwargs):
        cards = self._get_deck().cards.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)
