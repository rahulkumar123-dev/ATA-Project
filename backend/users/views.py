# backend/users/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import permissions, status
from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        
@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except:
        return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Invalidate token manually if using token blacklist (optional)
        return Response({'message': 'Logged out successfully'}, status=200)
    

# Serializer for profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

# View for GET and PUT profile
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Profile updated successfully!'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
