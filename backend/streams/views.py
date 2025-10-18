from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Channel, Stream, Follow, Subscription, Schedule
from .serializers import (
    CategorySerializer, ChannelSerializer, StreamSerializer,
    FollowSerializer, SubscriptionSerializer, ScheduleSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def followed(self, request):
        if not request.user.is_authenticated:
            return Response([])

        followed_channels = Follow.objects.filter(user=request.user).values_list('channel', flat=True)
        streams = Stream.objects.filter(channel__in=followed_channels)
        categories = Category.objects.filter(streams__in=streams).distinct()

        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


class ChannelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        channel = self.get_object()
        follow, created = Follow.objects.get_or_create(
            user=request.user,
            channel=channel
        )

        if created:
            channel.followers_count += 1
            channel.save()
            return Response({'status': 'following'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'already following'})

    @action(detail=True, methods=['post'])
    def unfollow(self, request, pk=None):
        channel = self.get_object()
        deleted_count, _ = Follow.objects.filter(
            user=request.user,
            channel=channel
        ).delete()

        if deleted_count > 0:
            channel.followers_count = max(0, channel.followers_count - 1)
            channel.save()
            return Response({'status': 'unfollowed'})
        return Response({'status': 'not following'})

    @action(detail=True, methods=['post'])
    def subscribe(self, request, pk=None):
        channel = self.get_object()
        subscription, created = Subscription.objects.get_or_create(
            user=request.user,
            channel=channel,
            defaults={'tier': 'basic'}
        )

        if created:
            return Response({'status': 'subscribed'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'already subscribed'})


class StreamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def live(self, request):
        streams = self.queryset.filter(is_live=True)
        serializer = self.get_serializer(streams, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recommended(self, request):
        streams = self.queryset.order_by('-viewer_count')[:20]
        serializer = self.get_serializer(streams, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def continue_watching(self, request):
        # This would typically check user's watch history
        # For now, just return recent streams
        streams = self.queryset.order_by('-created_at')[:10]
        serializer = self.get_serializer(streams, many=True)
        return Response(serializer.data)


class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
