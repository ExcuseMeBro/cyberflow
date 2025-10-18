from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .views import (
    CategoryViewSet, ChannelViewSet, StreamViewSet, ScheduleViewSet,
    CompetitionViewSet, GamingClubViewSet, GamingEventViewSet
)

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('channels', ChannelViewSet, basename='channel')
router.register('streams', StreamViewSet, basename='stream')
router.register('schedules', ScheduleViewSet, basename='schedule')
router.register('competitions', CompetitionViewSet, basename='competition')
router.register('clubs', GamingClubViewSet, basename='club')
router.register('events', GamingEventViewSet, basename='event')


@api_view(['POST'])
def scan_validate(request):
    """Validate QR code scan"""
    qr_code = request.data.get('code')

    if not qr_code:
        return Response({'error': 'QR code required'}, status=400)

    # TODO: Implement actual QR code validation logic
    # For now, just return success
    return Response({
        'valid': True,
        'message': 'QR code validated successfully',
        'data': {
            'type': 'event',  # or 'club', 'competition', etc.
            'id': 1
        }
    })


urlpatterns = [
    path('', include(router.urls)),
    path('scan/validate/', scan_validate, name='scan-validate'),
]
