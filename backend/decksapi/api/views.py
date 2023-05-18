from rest_framework import viewsets

from core.models import Deck
from .serializers import DeckSerializer


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
    pass
