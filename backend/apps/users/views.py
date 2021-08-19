from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, UserSignUpSerializer, UserSignInSerializer
from django.http import JsonResponse
from .models import User
from .mixins import CustomLoginRequiredMixin


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserSignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer

class UserSignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer

# If the class requires the log in status, call CustomLoginRequiredMixin
class UserCheckLogin(CustomLoginRequiredMixin, generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        # We can get login_user information when we use CustomLoginRequiredMixin.
        # - request.login_user
        serializer = UserSerializer([request.login_user], many=True)
        return Response(serializer.data[0])

class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = User.objects.all()[:20]
    serializer_class = UserSerializer