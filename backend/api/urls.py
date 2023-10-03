from django.urls import path, include

# from rest_framework.routers import SimpleRouter
# from rest_framework_simplejwt.views import TokenObtainPairView

# from .views import (
#     CardsViewSet, DashboardViewSet, ProfileViewSet, UserSignUp,
#     ConfirmCodeView, ChangePasswordView,
# )
# from .serializers import MyTokenObtainPairSerializer

# router = SimpleRouter()
# router.register('auth/signup', UserSignUp, basename='signup')
# router.register('dashboard', DashboardViewSet, basename='dashboard')
# router.register('profile', ProfileViewSet, basename='profile')
# router.register(
#     r'dashboard/(?P<slug>\w+)/cards',
#     CardsViewSet,
#     basename='cards',
# )


urlpatterns = [
    # path('', include(router.urls)),
    path('api/', include('users.urls')),
    path('api/', include('decks.urls')),
]
