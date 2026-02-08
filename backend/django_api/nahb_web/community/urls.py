from django.urls import path
from .api_views import (
    rate_story_api,
    rating_stats_api,
    rating_comments_api,
    top_stories_api,
    recent_comments_api
)


urlpatterns = [
    path("<int:story_id>/rate/", rate_story_api),
    path("<int:story_id>/rating/", rating_stats_api),
    path("<int:story_id>/comments/", rating_comments_api),
    path("top/", top_stories_api),
    path("<int:story_id>/recent/", recent_comments_api)
]