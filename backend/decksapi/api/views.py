from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404
from rest_framework import (
    generics, permissions, status, viewsets
)
from rest_framework.response import Response


from core.models import Card, CustomUser, Deck
from core.utils import Mail
from .mixins import CreateViewSet
from .permissions import OwnerOnly
from .serializers import (
    CardSerializer, ConfirmCodeSerializer, DeckSerializer, SignUpSerializer
)
from core.utils import decode_uid, encode_uid


class UserSignUp(CreateViewSet):
    """
    Регистрация пользователя.
    Пользователь отправляет email и password.
    На почту пользователю приходит сообщение с ссылкой актвиации
    Права доступа: Доступно без токена.
    Поля email и должны быть уникальными.
    Методы: только POST
    """
    queryset = CustomUser.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(
            password=make_password(serializer.validated_data['password'])
        )
        user_uid = encode_uid(user.id)
        user_code = default_token_generator.make_token(user)

        if settings.SEND_CONFIRM_EMAIL:
            mail = Mail(
                serializer.validated_data['email'],
                user_uid,
                user_code,
            )
            mail.send_message()
        return Response(
            status=status.HTTP_200_OK,
        )


class ConfirmCodeView(generics.ListCreateAPIView):
    """
    Пользовател подтвержадет свою почту по ссылке,
    которая пришла при регистрации.
    Права доступа: Доступно без токена.
    Методы: только POST
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = ConfirmCodeSerializer

    def _get_user_from_url(self, uid):
        id = decode_uid(uid)
        user = get_object_or_404(
            CustomUser,
            id=id)
        return user

    def get(self, request, *args, **kwargs):
        user = self._get_user_from_url(self.kwargs.get('uid'))
        if user.is_active or not default_token_generator.check_token(
            user,
            self.kwargs.get('code')
        ):
            return Response(status=status.HTTP_400_BAD_REQUEST,)
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK,)


class DashboardViewSet(viewsets.ModelViewSet):
    """
    CRUD Deck model with viewset and limit offset pagination.
    Methods: GET, POST, PUT, PATCH, DELETE.
    Only owner can edit the Deck.
    """
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    lookup_field = 'slug'

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
