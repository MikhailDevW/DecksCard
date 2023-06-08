from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
)

from .views import CardsViewSet, DashboardViewSet, UserSignUp


router = SimpleRouter()
router.register('dashboard', DashboardViewSet)
router.register(
    r'dashboard/(?P<deck_id>\d+)/cards',
    CardsViewSet,
    basename='cards',
)


urlpatterns = [
    path('', include(router.urls)),
    path(
        'auth/signup/',
        UserSignUp.as_view(),
        name='signup',
    ),
    re_path(
        r"^auth/create/?",
        TokenObtainPairView.as_view(),
        name="jwt-create"
    ),
    re_path(
        r"^auth/refresh/?",
        TokenRefreshView.as_view(),
        name="jwt-refresh"
    ),
    re_path(
        r"^auth/verify/?",
        TokenVerifyView.as_view(),
        name="jwt-verify"
    ),
]
