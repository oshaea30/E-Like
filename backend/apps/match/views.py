from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import MatchSerializer
from .models import Match


class MatchList(generics.CreateAPIView):    
    queryset = Match.objects.all()    
    serializer_class = MatchSerializer

   