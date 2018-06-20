from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Theorem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
        )

class TheoremSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theorem
        fields = (
            'id',
            'name',
            'definition',
            'ggbFile64',
            'classNum',
            'posted',
        )