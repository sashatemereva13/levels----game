import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.db.models import Avg, Count
from .models import Rating

from services.rating_service import RatingService
from services.report_service import ReportService

rating_service = RatingService()
report_service = ReportService()

# =========================
# Rate (protected)
# =========================
# rate or update rating
@login_required
@require_POST
def rate_story_api(request, story_id):
    body = json.loads(request.body)

    score = body.get("score")
    comment = body.get("comment", "")

    if score is None:
        return JsonResponse({"error": "score required"}, status=400)

    try:
        rating = rating_service.rate(request.user, story_id, int(score), comment)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({
        "story_id": story_id,
        "score": rating.score,
        "comment": rating.comment
    })



# =========================
# Report (protected)
# =========================
@login_required
@require_POST
def report_story_api(request, story_id):
    body = json.loads(request.body)

    reason = body.get("reason", "")

    try:
        report_service.create(request.user, story_id, reason)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"success": True})


@login_required
@require_GET
def reports_admin_api(request):
    if not request.user.is_staff:
        return JsonResponse({"error": "admin only"}, status=403)

    return JsonResponse(report_service.all(), safe=False)



@login_required
@require_GET
def story_reports_api(request, story_id):
    if not request.user.is_staff:
        return JsonResponse({"error": "admin only"}, status=403)

    return JsonResponse(report_service.for_story(story_id), safe=False)


@require_GET
def report_count_api(request, story_id):
    return JsonResponse({"count": report_service.count(story_id)})


# =========================
# Stats (public)
# =========================
@require_GET
def rating_stats_api(request, story_id):
    return JsonResponse(rating_service.stats(story_id))


# =========================
# Comments (public)
# =========================
@require_GET
def rating_comments_api(request, story_id):
    return JsonResponse(rating_service.comments(story_id), safe=False)


# =========================
# Top stories (leaderboard)
# =========================
@require_GET
def top_stories_api(request):
    return JsonResponse(rating_service.top(), safe=False)


# =========================
# Recent comments
# =========================
@require_GET
def recent_comments_api(request, story_id):
    return JsonResponse(rating_service.recent_comments(story_id), safe=False)



