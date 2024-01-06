# models.py
from django.db import models
from src.baseUser.models import BaseUser

class Expression(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    expression = models.CharField(max_length=255)
    category = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
