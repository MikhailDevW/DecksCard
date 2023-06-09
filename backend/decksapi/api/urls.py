from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import CardsViewSet, DashboardViewSet, UserSignUp
from .serializers import MyTokenObtainPairSerializer


router = SimpleRouter()
router.register('auth/signup', UserSignUp)
router.register('dashboard', DashboardViewSet)
router.register(
    r'dashboard/(?P<deck_id>\d+)/cards',
    CardsViewSet,
    basename='cards',
)


urlpatterns = [
    path('', include(router.urls)),
    re_path(
        r"^auth/login/?",
        TokenObtainPairView.as_view(
            serializer_class=MyTokenObtainPairSerializer
        ),
        name="jwt_obtain"
    ),
]
