from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import LikeSerializer
from .models import Likes

# Create your views here.

class LikeAdd(generics.CreateAPIView):    
    queryset = Likes.objects.all()    
    serializer_class = LikeSerializer

   