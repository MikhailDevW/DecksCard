from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import permissions

from core.models import Deck
from .permissions import OwnerOnly
from .serializers import DeckSerializer, CardSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    '''
    CRUD Deck model with viewset and limit offset pagination.
    Methods: GET, POST, PUT, PATCH, DELETE.
    Only owner can edit the Deck.
    '''
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

    def get_queryset(self):
        return self.request.user.decks.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CardsViewSet(viewsets.ModelViewSet):
    '''
    CRUD Comment model with viewset.
    Methods: GET, POST, PUT, PATCH, DELETE.
    Only owner can edit the comment.
    '''
    serializer_class = CardSerializer
    permission_classes = (OwnerOnly,)

    def _get_deck(self):
        return get_object_or_404(
            Deck,
            id=self.kwargs.get('deck_id')
        )

    def get_queryset(self):
        return self._get_deck().cards.all()
