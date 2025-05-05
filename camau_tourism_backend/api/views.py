from rest_framework import generics, viewsets, permissions
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from .models import *
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class UserLoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            response = Response({"id": user.id, "username": user.username}, status=200)
            response.set_cookie(
                key="accessToken",
                value=str(token.access_token),
                httponly=True,
                secure=True,
                samesite="Lax"
            )
            response.set_cookie(
                key="refreshToken",
                value=str(token),
                httponly=True,
                secure=True,
                samesite="Lax"
            )
            return response
    
class UserProfile(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def get_client(self, request):
        return get_object_or_404(Client, user=request.user)
    def retrieve(self, request):
        client = self.get_client(request)
        serializer = ClientSerializers(client)
        return Response(serializer.data)
    def update(self, request):
        client = self.get_client(request)
        data = request.data.copy()
        if 'avatar' in data and 'avatar' not in request.FILES:
            data.pop('avatar')
        serializer = ClientSerializers(client, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=False, methods=['get', 'patch'], url_path='me')
    def me(self, request):
        if request.method == 'GET':
            return self.retrieve(request)
        else:
            return self.update(request)
        
class AvatarUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=401)
        client = get_object_or_404(Client, user=request.user)
        serializer = AvatarSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'avatar': serializer.data['avatar']}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TourViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    lookup_field = 'slug'
    @action(detail=True, methods=['get'], url_path='tour-destination')
    def tourDestination(self, request, slug=None):
        tour = self.get_object()
        tour_destination = tour.tourDestination.all()
        serializers = TourDestinationSerializer(tour_destination, many=True)
        return Response(serializers.data)
    @method_decorator(cache_page(60*5)) 
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class DestinationViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    lookup_field = 'slug'

class HotelViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    lookup_field = 'slug'
    @action(detail=True, methods=['get'], url_path='rooms')
    def rooms(self, request, slug=None):
        hotel = self.get_object()
        rooms = hotel.rooms.all()
        serializer = HotelRoomSerializer(rooms, many = True)
        return Response(serializer.data)

class FestivalViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Festival.objects.all()
    serializer_class = FestivalSerializer
    lookup_field = 'slug'

class ArticleViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer
    lookup_field = 'slug'


class CuisineViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    lookup_field = 'slug'