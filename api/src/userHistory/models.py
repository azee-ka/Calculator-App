# models.py
from django.db import models
from src.baseUser.models import BaseUser

class UserHistory(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    expression = models.CharField(max_length=255)
    result = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.expression}"