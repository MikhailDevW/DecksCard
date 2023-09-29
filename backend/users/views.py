from rest_framework import viewsets

from .models import CustomUser
from .serializers import UserCreateReadSerializer


class UserVieSet(viewsets.ModelViewSet):
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
