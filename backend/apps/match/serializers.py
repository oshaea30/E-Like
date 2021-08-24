from .models import Match 
from rest_framework import serializers
import datetime

class MatchSerializer(serializers.ModelSerializer):
    user_id_1 = serializers.IntegerField(read_only=True)
    user_id_2 = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Match
        fields = '__all__'

