from apps.matches.models import Match
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
        # Check if the login_user belongs to the match.
        match = Match.objects.get(id=request.data['match_id'])
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
        # Check if the match owner is the login user
        match = Match.objects.get(id=request.data['match_id'])
        if (match.user_id_1.id != request.login_user.id) and (match.user_id_2.id != request.login_user.id):
            response = Response({'error': "You can not send a message to the person who you do not match."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        # Set the login user id for send_user_id
        request.data['send_user_id'] = request.login_user.id

        # Set the other user id for receive_user_id
        if match.user_id_1.id == request.login_user.id:
            receive_user_id = match.user_id_2.id
        else:
            receive_user_id = match.user_id_1.id
        request.data['receive_user_id'] = receive_user_id

        return self.create(request, *args, **kwargs)
