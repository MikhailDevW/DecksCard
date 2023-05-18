from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import DashboardViewSet, CardsViewSet

router = SimpleRouter()
router.register('dashboard', DashboardViewSet)
router.register(
    r'dashboard/(?P<deck_id>\d+)/cards',
    CardsViewSet,
    basename='cards',
)


urlpatterns = [
    path('v1/', include(router.urls)),
]
