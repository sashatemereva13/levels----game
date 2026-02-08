from django.urls import path
from .api_views import stories_api, create_story_api

urlpatterns = [
    path("", stories_api),
    path("create/", create_story_api),
]

