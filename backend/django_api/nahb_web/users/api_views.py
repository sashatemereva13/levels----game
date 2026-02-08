import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError

from services.auth_service import AuthService

service = AuthService()

@csrf_exempt
def register_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    body = json.loads(request.body)

    try:
        user = service.register(
            request,
            username=body["username"],
            password=body["password"]
        )
    except ValidationError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse(service.get_user_data(user))


@csrf_exempt
def login_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    body = json.loads(request.body)

    try:
        user = service.login_user(
            request,
            username=body["username"],
            password=body["password"]
        )
    except ValidationError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse(service.get_user_data(user))

def logout_api(request):
    service.logout_user(request)
    return JsonResponse({"success": True})

def me_api(request):
    data = service.get_user_data(request.user)

    if not data:
        return JsonResponse({"user": None})

    return JsonResponse(data)