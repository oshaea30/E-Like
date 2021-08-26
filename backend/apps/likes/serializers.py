from .models import Like
from rest_framework import serializers


class LikeSerializer(serializers.ModelSerializer):
    send_user_id = serializers.IntegerField(read_only=True)
    receive_user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'
