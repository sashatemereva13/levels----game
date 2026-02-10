import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count

from services.game_service import GameService
from .models import Play

service = GameService()


# start a story
def start_story_api(request, story_id):
    if not request.session.session_key:
        request.session.create()

    session_key = request.session.session_key

    page = service.start_story(story_id, session_key)

    return JsonResponse(page)


# get current page (resume)
def current_page_api(request, story_id):
    if not request.session.session_key:
        request.session.create()

    session_key = request.session.session_key

    page = service.get_current_page(story_id, session_key)

    return JsonResponse(page)


# choose next page
@csrf_exempt
def choose_api(request, story_id):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    body = json.loads(request.body)

    next_page_id = body["next_page_id"]

    if not request.session.session_key:
        request.session.create()

    session_key = request.session.session_key or request.session.create()

    page = service.choose(story_id=story_id,
                          next_page_id=next_page_id,
                          session_key=session_key,
                          user=request.user if request.user.is_authenticated else None)

    return JsonResponse(page)


def stats_api(request, story_id):
    plays = Play.objects.filter(story_id=story_id)

    total = plays.count()

    endings = (
        plays.values("ending_page_id")
        .exclude(ending_page_id=None)
        .annotate(count=Count("id"))
    )

    return JsonResponse({
        "total_plays": total,
        "endings": list(endings)
    })
