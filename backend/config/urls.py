# backend/config/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from users.serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# ✅ Custom token view
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ Use custom JWT login view
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Users app
    path('api/users/', include('users.urls')),

    # Tickets app
    path('api/tickets/', include('tickets.urls')),
]