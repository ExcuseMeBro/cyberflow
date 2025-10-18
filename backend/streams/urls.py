from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ChannelViewSet, StreamViewSet, ScheduleViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('channels', ChannelViewSet, basename='channel')
router.register('streams', StreamViewSet, basename='stream')
router.register('schedules', ScheduleViewSet, basename='schedule')

urlpatterns = [
    path('', include(router.urls)),
]
