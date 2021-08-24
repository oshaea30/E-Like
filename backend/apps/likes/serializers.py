from .models import Likes 
from rest_framework import serializers
import datetime

class LikeSerializer(serializers.ModelSerializer):
    send_user_id = serializers.IntegerField(read_only=True)
    receive_user_id = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Likes
        fields = '__all__'

class LikeAddSerializer(serializers.ModelSerializer):

    class Meta:
        model = Likes
        fields = '__all__'