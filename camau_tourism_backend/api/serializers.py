from rest_framework import serializers, viewsets
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth import authenticate
from rest_framework.response import Response

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    def validate_email(self, email):
        if User.objects.filter(email = email).exists():
            raise serializers.ValidationError('Email này đã tồn tại')
        return email
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Client.objects.create(user=user, phone='', address='')
        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate_username(self, username):
        if not User.objects.filter(username=username).exists():
            raise serializers.ValidationError('Tài khoản này không tồn tại.')
        return username
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({"username": ["Tài khoản này không tồn tại."]})
        if not user.is_active:
            raise serializers.ValidationError({"disable_account": ["Tài khoản này đã bị vô hiệu hóa."]})
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError({"password": ["Mật khẩu không đúng."]})
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']

class ClientSerializers(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Client
        fields = [
            'id', 'user', 'avatar', 'gender', 'date_of_birth', 'phone',
            'address', 'emergency_contact'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['avatar']

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'

class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = '__all__'


class HotelRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoom
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
    min_price = serializers.SerializerMethodField()
    class Meta:
        model = Hotel
        fields ='__all__'
    def get_min_price(self, obj):
        rooms = obj.rooms.all()
        min_room = rooms.order_by('price').first()
        return min_room.price if min_room else None
    
class HotelAmenitySerializer(serializers.ModelSerializer):
     class Meta:
        model = HotelAmenity
        fields ='__all__'

class TourDestinationSerializer(serializers.ModelSerializer):
    image_destination = serializers.SerializerMethodField()
    name_destination = serializers.SerializerMethodField()
    type_destination = serializers.SerializerMethodField()
    class Meta:
        model = TourDestination
        fields ='__all__'
    def get_image_destination(self, obj):
        return obj.destination.image_url.url if obj.destination else None
    def get_name_destination(self, obj):
        return obj.destination.name if obj.destination else None
    def get_type_destination(self, obj):
        return obj.destination.type if obj.destination else None

class FestivalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Festival
        fields = '__all__'
