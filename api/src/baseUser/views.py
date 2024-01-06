# views.py
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

@csrf_exempt
@require_POST
def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'success': True, 'user': {'username': user.username, 'user_type': 'your_user_type'}})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid credentials'})

@csrf_exempt
@require_POST
def register_view(request):
    form = UserCreationForm(request.POST)

    if form.is_valid():
        user = form.save()
        login(request, user)
        return JsonResponse({'success': True, 'user': {'username': user.username, 'user_type': 'your_user_type'}})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid registration data'})
