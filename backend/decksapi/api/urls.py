from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import DashboardViewSet

router = SimpleRouter()
router.register('dashboard', DashboardViewSet)


urlpatterns = [
    path('v1/', include(router.urls)),
]
