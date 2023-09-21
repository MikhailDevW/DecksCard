from rest_framework import permissions, generics

from .models import News, Tag
from .serializers import (
    NewsCreateUpdateSerializer, TagsSerializer, NewsReadSerializer
)


class NewsViewSet(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsCreateUpdateSerializer
    permission_classes = (permissions.AllowAny,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return NewsReadSerializer
        return self.serializer_class


class TagsViewSet(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagsSerializer
    permission_classes = (permissions.AllowAny,)
