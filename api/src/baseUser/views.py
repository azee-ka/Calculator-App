# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import BaseUser
from .serializers import BaseUserSerializer
from django.contrib.auth import authenticate, login

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = BaseUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"}, status=200)
    else:
        return Response({"message": "Invalid credentials"}, status=401)
