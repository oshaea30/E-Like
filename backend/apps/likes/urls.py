from django.urls import path   
from . import views

urlpatterns = [
    path('add/', views.Likes.as_view(), name='like'),
    path('', views.LikeAdd.as_view(), name='like_add')
]