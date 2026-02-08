from django.urls import path
from .api_views import register_api, login_api, logout_api, me_api

urlpatterns = [
    path("api/auth/register/", register_api),
    path("api/auth/login/", login_api),
    path("api/auth/logout/", logout_api),
    path("api/auth/me/", me_api),
]