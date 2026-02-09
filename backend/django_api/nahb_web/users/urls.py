from django.urls import path
from .api_views import register_api, login_api, logout_api, me_api

urlpatterns = [
    path("register/", register_api),
    path("login/", login_api),
    path("logout/", logout_api),
    path("me/", me_api),
]