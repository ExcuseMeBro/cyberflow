from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.db.models import Q
from .models import (
    Category, Channel, Stream, Follow, Subscription, Schedule,
    Competition, CompetitionParticipant, Leaderboard, GamingClub, GamingEvent
)
from .serializers import (
    CategorySerializer, ChannelSerializer, StreamSerializer,
    FollowSerializer, SubscriptionSerializer, ScheduleSerializer,
    CompetitionSerializer, CompetitionParticipantSerializer,
    LeaderboardSerializer, GamingClubSerializer, GamingEventSerializer
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


class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def live(self, request):
        """Get currently live competitions"""
        competitions = self.queryset.filter(status='live')
        serializer = self.get_serializer(competitions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming competitions"""
        competitions = self.queryset.filter(status='upcoming').order_by('start_date')
        serializer = self.get_serializer(competitions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        """Get competition leaderboard (top players globally)"""
        leaderboard = Leaderboard.objects.all()[:50]  # Top 50 players
        serializer = LeaderboardSerializer(leaderboard, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def join(self, request, pk=None):
        """Join a competition"""
        competition = self.get_object()

        # Check if competition is open
        if competition.status != 'upcoming':
            return Response(
                {'error': 'Can only join upcoming competitions'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if already joined
        if CompetitionParticipant.objects.filter(competition=competition, user=request.user).exists():
            return Response({'status': 'already joined'})

        # Check if competition is full
        if competition.current_participants >= competition.max_participants:
            return Response(
                {'error': 'Competition is full'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create participant
        participant = CompetitionParticipant.objects.create(
            competition=competition,
            user=request.user
        )

        # Update participant count
        competition.current_participants += 1
        competition.save()

        return Response({'status': 'joined'}, status=status.HTTP_201_CREATED)


class GamingClubViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GamingClub.objects.all()
    serializer_class = GamingClubSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        # Add user location from query params if provided
        if self.request:
            context['user_latitude'] = self.request.query_params.get('lat')
            context['user_longitude'] = self.request.query_params.get('lng')
        return context

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """Get nearby gaming clubs based on user location"""
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')

        if not lat or not lng:
            return Response(
                {'error': 'Latitude and longitude required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get all clubs and calculate distance in serializer
        clubs = self.queryset.all()
        serializer = self.get_serializer(clubs, many=True)

        # Sort by distance if available
        data = serializer.data
        data_with_distance = [club for club in data if club.get('distance') is not None]
        data_with_distance.sort(key=lambda x: x['distance'])

        return Response(data_with_distance[:20])  # Return top 20 nearest clubs


class GamingEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GamingEvent.objects.all()
    serializer_class = GamingEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """Get nearby gaming events based on user location"""
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')

        if not lat or not lng:
            return Response(
                {'error': 'Latitude and longitude required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        from datetime import datetime, timezone

        # Get upcoming events from nearby clubs
        events = self.queryset.filter(
            event_date__gte=datetime.now(timezone.utc)
        ).order_by('event_date')[:20]

        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
