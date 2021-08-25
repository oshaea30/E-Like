from django.urls import path
from . import views

urlpatterns =[
    path('matches', views.MatchList.as_view(), name='match_list')
]