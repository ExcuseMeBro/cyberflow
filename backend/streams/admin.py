from django.contrib import admin
from .models import (
    Category, Channel, Stream, Follow, Subscription, Schedule,
    Competition, CompetitionParticipant, Leaderboard, GamingClub, GamingEvent
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'viewer_count', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-viewer_count',)


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'is_live', 'followers_count', 'created_at')
    list_filter = ('is_live', 'created_at')
    search_fields = ('name', 'user__username')
    ordering = ('-followers_count',)


@admin.register(Stream)
class StreamAdmin(admin.ModelAdmin):
    list_display = ('title', 'channel', 'category', 'is_live', 'viewer_count', 'created_at')
    list_filter = ('is_live', 'category', 'created_at')
    search_fields = ('title', 'channel__name')
    ordering = ('-created_at',)


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('user', 'channel', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'channel__name')
    ordering = ('-created_at',)


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'channel', 'tier', 'is_active', 'started_at', 'expires_at')
    list_filter = ('tier', 'is_active', 'started_at')
    search_fields = ('user__username', 'channel__name')
    ordering = ('-started_at',)


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('title', 'channel', 'category', 'scheduled_at', 'created_at')
    list_filter = ('scheduled_at', 'created_at')
    search_fields = ('title', 'channel__name')
    ordering = ('scheduled_at',)


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    list_display = ('title', 'game', 'status', 'prize', 'current_participants', 'max_participants', 'start_date')
    list_filter = ('status', 'start_date', 'created_at')
    search_fields = ('title', 'game')
    ordering = ('start_date',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(CompetitionParticipant)
class CompetitionParticipantAdmin(admin.ModelAdmin):
    list_display = ('user', 'competition', 'rank', 'points', 'wins', 'losses', 'joined_at')
    list_filter = ('competition', 'joined_at')
    search_fields = ('user__username', 'competition__title')
    ordering = ('rank',)


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('rank', 'user', 'total_points', 'total_wins', 'total_competitions', 'updated_at')
    list_filter = ('updated_at',)
    search_fields = ('user__username',)
    ordering = ('rank',)
    readonly_fields = ('updated_at',)


@admin.register(GamingClub)
class GamingClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'players_count', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('name', 'address')
    ordering = ('-rating',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(GamingEvent)
class GamingEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'game', 'event_date', 'current_attendees', 'max_attendees')
    list_filter = ('event_date', 'club', 'created_at')
    search_fields = ('title', 'game', 'club__name')
    ordering = ('event_date',)
    readonly_fields = ('created_at', 'updated_at')
