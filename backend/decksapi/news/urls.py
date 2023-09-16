from django.urls import path

from .views import NewsViewSet, TagsViewSet

urlpatterns = [
    path('news/', NewsViewSet.as_view(),),
    path('tags/', TagsViewSet.as_view(),),
]
