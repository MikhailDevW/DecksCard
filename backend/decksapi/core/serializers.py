from djoser.serializers import UserCreateSerializer

from core.models import CustomUser


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = (
            "id", "email", "username", "password")
