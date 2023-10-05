from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# schema_view = get_schema_view(
#    openapi.Info(
#       title="Decks API",
#       default_version='v1',
#       description="Decks API description",
#       # terms_of_service="URL страницы с пользовательским соглашением",
#       contact=openapi.Contact(email="email here"),
#       license=openapi.License(name="BSD License"),
#    ),
#    public=True,
#    permission_classes=(permissions.AllowAny,),
# )

# urlpatterns += [
#    url(r'^swagger(?P<format>\.json|\.yaml)$',
#        schema_view.without_ui(cache_timeout=0), name='schema-json'),
#    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0),
#        name='schema-swagger-ui'),
#    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0),
#        name='schema-redoc'),
# ]
