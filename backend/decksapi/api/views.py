# from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import (
    generics, permissions, status, viewsets
)
from rest_framework.response import Response

from core.models import Card, CustomUser, Deck
from .permissions import OwnerOnly
from .serializers import CardSerializer, DeckSerializer, SignUpSerializer


class UserSignUp(generics.CreateAPIView):
    """
    Получить код подтверждения на переданный email.
    Права доступа: Доступно без токена.
    Использовать имя 'me' в качестве username запрещено.
    Поля email и username должны быть уникальными.
    """
    queryset = CustomUser.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # user_code = default_token_generator.make_token(user)

        # if settings.SEND_CONFIRM_EMAIL:
        #     mail = Mail(
        #         serializer.validated_data['email'],
        #         user_code,
        #     )
        #     mail.send_message()
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


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
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = (OwnerOnly,)

    def _get_deck(self):
        return get_object_or_404(
            Deck,
            id=self.kwargs.get('deck_id')
        )

    def get_queryset(self):
        return self._get_deck().cards.all()
