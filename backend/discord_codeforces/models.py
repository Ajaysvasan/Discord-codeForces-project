from django.db import models
from django.test.testcases import QuietWSGIRequestHandler


# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
