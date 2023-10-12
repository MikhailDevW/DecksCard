from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CustomUser
from .mixins import ReadCreateViewSet
from .serializers import (
    ChangeCurrentPasswordSerializer, ConfirmCodeSerializer,
    UserCreateReadSerializer
)
from .paginators import CustomUsersPaginator
from .utils import decode_uid, encode_uid
from .tasks import send_confirmation_email


class UserViewSet(ReadCreateViewSet):
    """
    Работа с пользователями приложения.
    Список пользователей и профиль доступны всем.
    [GET | {id}] - получение всех пользователей или конкретного.
    [POST] - регистрация пользователя.
    [GET/'me'] - профиль текущего пользователя.
    [POST/'set_password'] - изменения пароля.
    """
    pagination_class = CustomUsersPaginator

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
        user = serializer.save()
        user_uid = encode_uid(user.id)
        user_code = default_token_generator.make_token(user)
        send_confirmation_email.delay(
            user.email,
            user_uid,
            user_code,
        )

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


class ConfirmCodeView(generics.ListCreateAPIView):
    """
    User confirms his email via url.
    Methods: POST only
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
