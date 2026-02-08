from django.urls import path
from .api_views import (
    rate_story_api,
    rating_stats_api,
    rating_comments_api,
    top_stories_api,
    recent_comments_api,
    report_story_api,
    reports_admin_api, story_reports_api, report_count_api
)


urlpatterns = [
    path("<int:story_id>/rate/", rate_story_api),
    path("<int:story_id>/rating-stats/", rating_stats_api),
    path("<int:story_id>/comments/", rating_comments_api),
    path("top/", top_stories_api),
    path("<int:story_id>/recent-comments/", recent_comments_api),

    path("<int:story_id>/report/", report_story_api),
    path("reports/", reports_admin_api),
    path("<int:story_id>/reports/", story_reports_api),
    path("<int:story_id>/report-count/", report_count_api),
]