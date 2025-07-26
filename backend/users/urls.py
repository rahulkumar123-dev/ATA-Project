from django.urls import path
from .views import RegisterView, UserView, LogoutView, UserProfileView, MyTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),           # GET
    path('profile/update/', UserProfileView.as_view(), name='user-profile-update'),  # PUT
]