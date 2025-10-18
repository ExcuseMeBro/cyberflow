from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import login_view, register_view, UserProfileView

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
