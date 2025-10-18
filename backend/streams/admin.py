from django.contrib import admin
from .models import Category, Channel, Stream, Follow, Subscription, Schedule


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
