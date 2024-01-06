# serializers.py
from rest_framework import serializers
from .models import BaseUser
from ..calc.expression.models import Expression
from ..userHistory.models import UserHistory

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = '__all__'