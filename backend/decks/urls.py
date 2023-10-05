from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import CardsViewSet, DashboardViewSet

router = SimpleRouter()
router.register('dashboard', DashboardViewSet, basename='dashboard')
router.register(
    r'dashboard/(?P<slug>\w+)/cards',
    CardsViewSet,
    basename='cards',
)

urlpatterns = [
    path('', include(router.urls)),
]
