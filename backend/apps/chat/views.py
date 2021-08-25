from rest_framework import generics
from .serializers import ChatSerializer
from .models import Chat


class ChatList(generics.ListAPIView):
    # Get all posts, limit = 20
    queryset = Chat.objects.order_by('id').reverse().all()[:20]
    serializer_class = ChatSerializer


class ChatAdd(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
