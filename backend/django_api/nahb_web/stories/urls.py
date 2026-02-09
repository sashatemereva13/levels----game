from django.urls import path
from .api_views import stories_api, create_story_api, my_stories_api, update_story_api, delete_story_api

urlpatterns = [
    path("", stories_api),
    path("create/", create_story_api),
    path("mine/", my_stories_api),
    path("<int:story_id>/update/", update_story_api),
    path("<int:story_id>/", delete_story_api),

]

