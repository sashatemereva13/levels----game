from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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