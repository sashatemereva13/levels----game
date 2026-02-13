from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

from services.page_service import PageService

service = PageService()


@login_required
def page_detail_api(request, page_id):

    if request.method == "GET":
        return JsonResponse(service.get_page(request.user, page_id))

    if request.method == "PUT":
        data = json.loads(request.body)
        return JsonResponse(service.update_page(request.user, page_id, data))

    if request.method == "DELETE":
        service.delete_page(request.user, page_id)
        return JsonResponse({"ok": True})

    return JsonResponse({"error": "method not allowed"}, status=405)


@csrf_exempt
@login_required
def create_choice_api(request, page_id):
    data = json.loads(request.body)
    return JsonResponse(service.create_choice(request.user, page_id, data))
