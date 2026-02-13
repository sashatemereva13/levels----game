from django.urls import path
from .api_views import page_detail_api, create_choice_api

urlpatterns = [
    path("<int:page_id>/", page_detail_api),
    path("<int:page_id>/choices/", create_choice_api),
]
