from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import DashboardViewSet

router = SimpleRouter()
router.register('dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
]
