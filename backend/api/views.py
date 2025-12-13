import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        identifier = data.get("identifier")
        password = data.get("password")
        isValidCredentials = True
        if isValidCredentials:
            return JsonResponse({"error": False, "message": "User logged in"})
        else:
            return JsonResponse(
                {
                    "error": True,
                    "message": "The user name or password entered is not valid. ",
                }
            )
    else:
        return JsonResponse({"error": True, "message": "Invalid method type"})
