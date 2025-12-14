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
        # some DB shits
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


@csrf_exempt
def register(request):
    print(request.method)
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data.get("userName")
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirmPassword")
        # hash the password
        # some db shits
        # assuming there are some errors so declare the hasRegistered which is a boolean value
        # two things to check if the user is already registered and some is there any internal db error these are two cases
        # if register successful then 0 else -1 for internal error and 1 for register side error ie the user has already hasRegistered
        isRegistered = 0
        if isRegistered == 0:
            return JsonResponse({"error": False, "message": "registered successfully"})
        elif isRegistered == -1:
            return JsonResponse({"error": True, "message": "Network or server error"})
        else:
            return JsonResponse(
                {"error": True, "message": "User already exsits. Try logging in!"}
            )
    else:
        print("I dont know what the fuck happened")
        return JsonResponse({"error": True, "message": "Invalid method type"})
