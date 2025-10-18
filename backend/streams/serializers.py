from rest_framework import serializers
from .models import Category, Channel, Stream, Follow, Subscription, Schedule
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
