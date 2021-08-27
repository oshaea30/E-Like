from .models import Match
from rest_framework import serializers
import datetime


class MatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Match
        fields = '__all__'
