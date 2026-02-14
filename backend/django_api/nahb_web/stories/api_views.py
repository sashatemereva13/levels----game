from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

from services.story_api import StoryAPIClient
from services.story_service import StoryService


service = StoryService()

def stories_api(request):
    return JsonResponse(service.list_published(), safe=False)

@csrf_exempt
def create_story_api(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "login required"}, status=401)

    data = json.loads(request.body)

    story = service.create_story(request.user, data)
    return JsonResponse(story)

@login_required
@csrf_exempt
def get_story_api(request, story_id):
    if request.method != "GET":
        return JsonResponse({"error": "GET required"}, status=405)

    try:
        story = service.api.get_story(story_id)
    except PermissionError:
        return JsonResponse({"error": "not found"}, status=404)

    return JsonResponse(story)


@login_required
def my_stories_api(request):
    stories = service.user_stories(request.user)
    return JsonResponse(stories, safe=False)


@csrf_exempt
@login_required
def update_story_api(request, story_id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT required"}, status=405)

    data = json.loads(request.body)

    try:
        story = service.update_story(request.user, story_id, data)
    except PermissionError:
        return JsonResponse({"error": "not owner"}, status=403)

    return JsonResponse(story)


@csrf_exempt
@login_required
def delete_story_api(request, story_id):
    if request.method != "DELETE":
        return JsonResponse({"error": "DELETE required"}, status=405)

    try:
        service.delete_story(request.user, story_id)
    except PermissionError:
        return  JsonResponse({"error": "not owner"}, status=403)

    return JsonResponse({"ok": True})



@csrf_exempt
@login_required
def publish_story_api(request, story_id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT required"}, status=405)

    try:
        service.publish_story(request.user, story_id)
    except PermissionError:
        return JsonResponse({"error": "not owner"}, status=403)

    return JsonResponse({"ok": True})


@csrf_exempt
@login_required
def create_page_api(request, story_id):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)

    try:
        page = service.create_page(request.user, story_id, data)
    except PermissionError:
        return JsonResponse({"error": "not owner"}, status=403)

    return JsonResponse(page)



@csrf_exempt
@login_required
def story_pages_api(request, story_id):
    if request.method == "GET":
        pages = service.get_story_pages(request.user, story_id)
        return JsonResponse(pages, safe=False)

    if request.method == "POST":
        data = json.loads(request.body)

        try:
            page = service.create_page(request.user, story_id, data)
        except PermissionError:
            return JsonResponse({"error": "not owner"}, status=403)

        return JsonResponse(page)

    return JsonResponse({"error": "Method not allowed"}, status=405)