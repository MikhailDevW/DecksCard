from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from core.models import Deck
# from .permissions import OwnerOnly
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
    # permission_classes = (OwnerOnly,)

    def _get_deck(self):
        return get_object_or_404(
            Deck,
            id=self.kwargs.get('deck_id')
        )

    def _isowner(self):
        if not self.request.user.decks.filter(
            id=self.kwargs.get('deck_id')
        ).exists():
            return False
        return True

    def get_queryset(self):
        if not self._isowner():
            raise PermissionDenied('Not allowed!')
        return self._get_deck().cards.all()

    def perform_create(self, serializer):
        serializer.save(
            deck=self._get_deck(),
        )

    def perform_update(self, serializer):
        if not self._isowner():
            raise PermissionDenied('Change is not allowed!')
        super(CardsViewSet, self).perform_update(serializer)

    def perform_destroy(self, instance):
        if not self._isowner():
            raise PermissionDenied(
                'Delete is not allowed.'
            )
        super(CardsViewSet, self).perform_destroy(instance)
