from rest_framework import serializers
from .models import (
    Category, Channel, Stream, Follow, Subscription, Schedule,
    Competition, CompetitionParticipant, Leaderboard, GamingClub, GamingEvent
)
from accounts.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'thumbnail', 'description', 'viewer_count', 'created_at']


class ChannelSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_following = serializers.SerializerMethodField()
    is_subscribed = serializers.SerializerMethodField()

    class Meta:
        model = Channel
        fields = [
            'id', 'user', 'name', 'banner', 'description', 'is_live',
            'followers_count', 'is_following', 'is_subscribed', 'created_at'
        ]

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Follow.objects.filter(user=request.user, channel=obj).exists()
        return False

    def get_is_subscribed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Subscription.objects.filter(
                user=request.user, channel=obj, is_active=True
            ).exists()
        return False


class StreamSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Stream
        fields = [
            'id', 'channel', 'category', 'title', 'thumbnail', 'is_live',
            'viewer_count', 'started_at', 'ended_at', 'created_at'
        ]


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'user', 'channel', 'created_at']
        read_only_fields = ['user']


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = [
            'id', 'user', 'channel', 'tier', 'is_active',
            'started_at', 'expires_at'
        ]
        read_only_fields = ['user']


class ScheduleSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'channel', 'category', 'title', 'description', 'scheduled_at', 'created_at']


class CompetitionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    participants_count = serializers.IntegerField(source='current_participants', read_only=True)
    days_until = serializers.SerializerMethodField()
    is_joined = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            'id', 'title', 'game', 'category', 'description', 'thumbnail',
            'prize', 'entry_fee', 'max_participants', 'participants_count',
            'status', 'progress', 'start_date', 'end_date', 'days_until',
            'is_joined', 'created_at'
        ]

    def get_days_until(self, obj):
        from datetime import datetime, timezone
        if obj.status == 'upcoming':
            delta = obj.start_date - datetime.now(timezone.utc)
            return max(0, delta.days)
        return 0

    def get_is_joined(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return CompetitionParticipant.objects.filter(
                competition=obj, user=request.user
            ).exists()
        return False


class CompetitionParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    competition = CompetitionSerializer(read_only=True)

    class Meta:
        model = CompetitionParticipant
        fields = ['id', 'competition', 'user', 'rank', 'points', 'wins', 'losses', 'joined_at']
        read_only_fields = ['user']


class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    name = serializers.CharField(source='user.display_name', read_only=True)
    avatar = serializers.ImageField(source='user.avatar', read_only=True)
    points = serializers.IntegerField(source='total_points', read_only=True)
    wins = serializers.IntegerField(source='total_wins', read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'rank', 'user', 'name', 'avatar', 'points', 'wins', 'total_competitions', 'updated_at']


class GamingClubSerializer(serializers.ModelSerializer):
    distance = serializers.SerializerMethodField()
    coordinates = serializers.SerializerMethodField()

    class Meta:
        model = GamingClub
        fields = [
            'id', 'name', 'logo', 'description', 'address', 'latitude', 'longitude',
            'players_count', 'rating', 'games', 'phone', 'website', 'distance',
            'coordinates', 'created_at'
        ]

    def get_distance(self, obj):
        # Calculate distance from user's location (if provided in context)
        user_lat = self.context.get('user_latitude')
        user_lng = self.context.get('user_longitude')

        if user_lat and user_lng:
            from math import radians, sin, cos, sqrt, atan2

            # Haversine formula to calculate distance
            R = 6371  # Earth's radius in km

            lat1 = radians(float(user_lat))
            lon1 = radians(float(user_lng))
            lat2 = radians(float(obj.latitude))
            lon2 = radians(float(obj.longitude))

            dlat = lat2 - lat1
            dlon = lon2 - lon1

            a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
            c = 2 * atan2(sqrt(a), sqrt(1-a))
            distance = R * c

            return round(distance, 1)

        return None

    def get_coordinates(self, obj):
        return {
            'lat': float(obj.latitude),
            'lng': float(obj.longitude)
        }


class GamingEventSerializer(serializers.ModelSerializer):
    club = GamingClubSerializer(read_only=True)
    club_name = serializers.CharField(source='club.name', read_only=True)

    class Meta:
        model = GamingEvent
        fields = [
            'id', 'club', 'club_name', 'title', 'game', 'description', 'thumbnail',
            'event_date', 'duration_hours', 'max_attendees', 'current_attendees',
            'created_at'
        ]
