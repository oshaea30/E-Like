from .models import Chat
from rest_framework import serializers


class ChatSerializer(serializers.ModelSerializer):
    send_user_id = serializers.IntegerField(read_only=True)
    receive_user_id = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Chat
        fields = '__all__'

