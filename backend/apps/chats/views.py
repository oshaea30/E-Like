from apps.matches.models import Match
from apps.users.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import ChatSerializer
from .models import Chat
from django_filters.rest_framework import DjangoFilterBackend
from apps.users.mixins import CustomLoginRequiredMixin


class ChatList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Chat.objects.order_by('-id').all()
    serializer_class = ChatSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['match_id']

    def get(self, request, *args, **kwargs):
        # Get match id from query param
        match_id = request.GET.get("match_id")
        # Check if the login_user belongs to the match.
        match = Match.objects.get(id=match_id)
        if (match.user_id_1.id != request.login_user.id) and (match.user_id_2.id != request.login_user.id):
            response = Response({'error': "You do not have the authority to get messages."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        return self.list(request, *args, **kwargs)


class ChatAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        chat_data = request.data
        # Check if the match owner is the login user
        match = Match.objects.get(id=chat_data['match_id'])
        if (match.user_id_1.id != request.login_user.id) and (match.user_id_2.id != request.login_user.id):
            response = Response({'error': "You can not send a message to the person who you do not match."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        # Set the other user id for receive_user_id
        if match.user_id_1.id == request.login_user.id:
            receive_user_id = match.user_id_2.id
        else:
            receive_user_id = match.user_id_1.id

        #Override create chat method to get depth response
        new_chat = Chat.objects.create(
            send_user_id=User.objects.get(id=request.login_user.id), 
            receive_user_id=User.objects.get(id=receive_user_id), 
            match_id=Match.objects.get(id=chat_data['match_id']), 
            body=chat_data['body']
        )

        # Convert Model to Serializer
        serializer = ChatSerializer(new_chat)

        # Response data as Dict
        return Response(serializer.data)
