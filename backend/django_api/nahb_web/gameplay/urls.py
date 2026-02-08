from django.urls import path
from .api_views import start_story_api, current_page_api, choose_api, stats_api

urlpatterns = [
    path("<int:story_id>/start", start_story_api),
    path("<int:story_id>/current", current_page_api),
    path("<int:story_id>/choice", choose_api),

   path("<int:story_id>/stats", stats_api),

]