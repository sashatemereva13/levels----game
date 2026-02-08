import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.db.models import Avg, Count
from .models import Rating

from services.rating_service import RatingService

service = RatingService()


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
        rating = service.rate(request.user, story_id, int(score), comment)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({
        "story_id": story_id,
        "score": rating.score,
        "comment": rating.comment
    })



# =========================
# Stats (public)
# =========================
@require_GET
def rating_stats_api(request, story_id):
    return JsonResponse(service.stats(story_id))


# =========================
# Comments (public)
# =========================
@require_GET
def rating_comments_api(request, story_id):
    return JsonResponse(service.comments(story_id), safe=False)


# =========================
# Top stories (leaderboard)
# =========================
@require_GET
def top_stories_api(request):
    return JsonResponse(service.top(), safe=False)


# =========================
# Recent comments
# =========================
@require_GET
def recent_comments_api(request, story_id):
    return JsonResponse(service.recent_comments(story_id), safe=False)