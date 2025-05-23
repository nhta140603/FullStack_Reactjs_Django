from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from api.views import *
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'tours', TourViewSet)
router.register(r'hotels', HotelViewSet)
router.register(r'destinations', DestinationViewSet)
router.register(r'festivals', FestivalViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'cuisines', CuisineViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path("login/", UserLoginView.as_view(), name="login-user"),
    path('me/', UserProfile.as_view({'get': 'me', 'patch': 'me'}), name='client-me'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('profile/avatar/', AvatarUpdateView.as_view(), name='avatar-upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)