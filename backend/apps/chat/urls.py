from django.urls import path
from . import views

urlpatterns = [
    path('chats/', views.ChatList.as_view(), name='chats'),
    path('chats/add', views.ChatAdd.as_view(), name='chat_add'),
]
