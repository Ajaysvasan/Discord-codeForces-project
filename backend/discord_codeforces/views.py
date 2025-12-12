# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views import View


def hello(request):
    return HttpResponse("hello from function")


class HelloEthopia(View):
    def get(self, request):
        return HttpResponse("Hello from class")
