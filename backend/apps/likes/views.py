from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import LikeSerializer
from .models import Like

# Create your views here.


class LikeAdd(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
