from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TicketModelSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Ticket
        fields = [
            'id', 'subject', 'description',
            'status', 'priority',
            'department', 'created_at', 'updated_at',
            'user'
        ]

class TicketSearchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    subject = serializers.CharField()
    description = serializers.CharField()
    status = serializers.CharField()
    priority = serializers.CharField()
    department = serializers.CharField(allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    user = serializers.DictField()

    def to_representation(self, instance):
        source = instance.get('_source', instance)
        return {
            'id': source.get('id') or source.get('id'),
            'subject': source.get('subject'),
            'description': source.get('description'),
            'status': source.get('status'),
            'priority': source.get('priority'),
            'department': source.get('department'),
            'created_at': source.get('created_at'),
            'updated_at': source.get('updated_at'),
            'user': source.get('user', {}),
        }
