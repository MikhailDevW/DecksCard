# from datetime import date
# import smtplib

# from django.conf import settings
# from django.contrib.auth.hashers import make_password
# from django.contrib.auth.tokens import default_token_generator
# from django.shortcuts import get_object_or_404
# from rest_framework import (
#     generics, permissions, status, viewsets
# )
# from rest_framework.decorators import action
# from rest_framework.response import Response

# from core.example_deck import example_deck
# from core.models import Card, CustomUser, Deck
# from core.utils import Mail
# from .mixins import CreateViewSet
# from .permissions import OwnerOnly
# from .serializers import (
#     CardSerializer, ConfirmCodeSerializer, DeckSerializer, ProfileSerializer,
#     SignUpSerializer, ChangePasswordSerializer,
# )
# from core.utils import decode_uid, encode_uid


# class UserSignUp(CreateViewSet):
#     """
#     Регистрация пользователя.
#     Пользователь отправляет email и password.
#     На почту пользователю приходит сообщение с ссылкой актвиации
#     Права доступа: Доступно без токена.
#     Поля email и должны быть уникальными.
#     Методы: только POST
#     """
#     queryset = CustomUser.objects.select_related().all()
#     serializer_class = SignUpSerializer
#     permission_classes = (permissions.AllowAny,)

#     def create(self, request, *args, **kwargs):
#         signup_status = {}

#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save(
#             password=make_password(
#                 serializer.validated_data['password'],
#             ),
#             is_active=True,  # данную возможность отсавляем
#             # пока не работает подтверждение по почте
#         )

#         user_uid = encode_uid(user.id)
#         user_code = default_token_generator.make_token(user)
#         signup_status['example_deck'] = example_deck(user)

#         try:
#             if settings.SEND_CONFIRM_EMAIL:
#                 mail = Mail(
#                     serializer.validated_data['email'],
#                     user_uid,
#                     user_code,
#                 )
#                 mail.send_message()
#         except smtplib.SMTPAuthenticationError as auth_error:
#             signup_status['mail_sent'] = (
#                 f'Message not sent. Error: {auth_error}'
#             )
#             # user.delete()
#         except AssertionError as error:
#             signup_status['mail_sent'] = f'Some sending error occured! {error}'
#             # user.delete()

#         return Response(
#             status=status.HTTP_200_OK,
#             data={
#                 'signup_status': signup_status
#             }
#         )


# class ConfirmCodeView(generics.ListCreateAPIView):
#     """
#     Пользовател подтвержадет свою почту по ссылке,
#     которая пришла при регистрации.
#     Права доступа: Доступно без токена.
#     Методы: только POST
#     """
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = ConfirmCodeSerializer

#     def _get_user_from_url(self, uid):
#         id = decode_uid(uid)
#         user = get_object_or_404(
#             CustomUser,
#             id=id)
#         return user

#     def get(self, request, *args, **kwargs):
#         user = self._get_user_from_url(self.kwargs.get('uid'))
#         if user.is_active or not default_token_generator.check_token(
#             user,
#             self.kwargs.get('code')
#         ):
#             return Response(status=status.HTTP_400_BAD_REQUEST,)
#         user.is_active = True
#         user.save()
#         return Response(status=status.HTTP_200_OK,)


# class DashboardViewSet(viewsets.ModelViewSet):
#     """
#     CRUD Deck model with viewset and limit offset pagination.
#     Methods: GET, POST, PUT, PATCH, DELETE.
#     Only owner can edit the Deck.
#     """
#     queryset = Deck.objects.select_related('ghjg').all()
#     serializer_class = DeckSerializer
#     lookup_field = 'slug'

#     def get_queryset(self):
#         return (
#             self.request.user.decks.select_related('author').all()
#         )

#     def perform_create(self, serializer):
#         serializer.save(
#             author=self.request.user
#         )


# class CardsViewSet(viewsets.ModelViewSet):
#     queryset = Card.objects.all()
#     serializer_class = CardSerializer
#     permission_classes = (OwnerOnly,)

#     def _get_deck(self):
#         return get_object_or_404(
#             Deck,
#             id=decode_uid(self.kwargs.get('slug'))
#         )

#     def get_queryset(self):
#         return self._get_deck().cards.filter(
#             next_use_date__date__lte=date.today()
#         )

#     def perform_create(self, serializer):
#         serializer.save(deck=self._get_deck())

#     @action(
#         methods=['get'],
#         detail=False,
#         permission_classes=(OwnerOnly,),
#         url_path='all',
#         url_name='all'
#     )
#     def all(self, request, *args, **kwargs):
#         cards = self._get_deck().cards.all()
#         serializer = CardSerializer(cards, many=True)
#         return Response(serializer.data)


# class ProfileViewSet(viewsets.ModelViewSet):
#     """
#     Профиль пользователя.
#     Методы: GET, PATCH
#     """
#     queryset = CustomUser.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = (permissions.IsAdminUser,)
#     # filter_backends = (filters.SearchFilter,)
#     # search_fields = ('username',)

#     def get_serializer_class(self):
#         if self.action == 'me' and self.request.method == 'PATCH':
#             return ChangePasswordSerializer
#         return self.serializer_class

#     @action(
#         methods=['patch', 'get'],
#         detail=False,
#         permission_classes=(permissions.IsAuthenticated,),
#         url_path='me',
#         url_name='me'
#     )
#     def me(self, request, *args, **kwargs):
#         instance = self.request.user
#         serializer = self.get_serializer(instance)
#         if self.request.method == 'PATCH':
#             serializer = self.get_serializer(
#                 instance,
#                 data=request.data,
#                 partial=True
#             )
#             if not serializer.is_valid():
#                 return Response(status=status.HTTP_400_BAD_REQUEST)
#             serializer.save(
#                 role=instance.role,
#             )
#             return Response(serializer.data)
#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK
#         )


# class ChangePasswordView(generics.UpdateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = ChangePasswordSerializer
#     permission_classes = [permissions.IsAuthenticated]
