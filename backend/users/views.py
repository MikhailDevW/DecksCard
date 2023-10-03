from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CustomUser
from .mixins import ReadCreateViewSet
from .serializers import (
    ChangeCurrentPasswordSerializer, UserCreateReadSerializer
)


class UserViewSet(ReadCreateViewSet):
    """
    Работа с пользователями приложения.
    Список пользователей и профиль доступны всем.
    [GET | {id}] - получение всех пользователей или конкретного.
    [POST] - регистрация пользователя.
    [GET/'me'] - профиль текущего пользователя.
    [POST/'set_password'] - изменения пароля.
    """

    def get_queryset(self):
        queryset = CustomUser.objects.all()
        return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateReadSerializer
        return UserCreateReadSerializer

    def get_permissions(self):
        if self.action in ('list', 'create'):
            self.permission_classes = (permissions.AllowAny,)
        return [permission() for permission in self.permission_classes]

    def perform_create(self, serializer):
        obj = super().perform_create(serializer)

        # sending email
        # send_confirmation_email('fdsfd')
        return obj

    @action(
        methods=['get'],  # пока только гет
        detail=False,
        permission_classes=(permissions.IsAuthenticated,),
        url_path='profile',
        url_name='profile',
    )
    def profile(self, request, *args, **kwargs):
        instance = self.request.user
        serializer = self.get_serializer(instance)
        if self.request.method == 'PATCH':
            serializer = self.get_serializer(
                instance,
                data=request.data,
                partial=True
            )
            if not serializer.is_valid():
                data = {'detail': 'Uuuups'}
                return Response(
                    data=data,
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer.save(
                role=instance.role,
            )
            return Response(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    @action(
        ['patch'],
        detail=False,
        permission_classes=(permissions.IsAuthenticated, ),
    )
    def set_password(self, request, *args, **kwargs):
        serializer = ChangeCurrentPasswordSerializer(
            data=request.data,
            context={'request': request},
        )
        serializer.is_valid(raise_exception=True)
        self.request.user.set_password(serializer.data['new_password'])
        self.request.user.save()
        return Response(
            status=status.HTTP_202_ACCEPTED
        )


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
#          signup_status['mail_sent'] = f'Some sending error occured! {error}'
#             # user.delete()

#         return Response(
#             status=status.HTTP_200_OK,
#             data={
#                 'signup_status': signup_status
#             }
#         )
