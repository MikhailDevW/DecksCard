from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import ConfirmCodeView, UserViewSet
from .serializers import MyTokenObtainPairSerializer

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path(
        'auth/token/',
        TokenObtainPairView.as_view(
            serializer_class=MyTokenObtainPairSerializer
        ),
        name='token_obtain'
    ),
    re_path(
        r'auth/confirm/(?P<uid>\w+)/(?P<code>[-\w]+)/',
        ConfirmCodeView.as_view(),
        name='confirmation',
    ),
]
