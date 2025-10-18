from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'phone', 'display_name', 'is_active', 'created_at')
    list_filter = ('is_active', 'is_staff', 'created_at')
    search_fields = ('username', 'phone', 'display_name')
    ordering = ('-created_at',)

    fieldsets = (
        (None, {'fields': ('phone', 'password')}),
        ('Personal info', {'fields': ('username', 'display_name', 'bio', 'avatar')}),
        ('Social Links', {'fields': (
            'discord_link', 'youtube_link', 'twitter_link',
            'instagram_link', 'facebook_link', 'telegram_link', 'linkedin_link'
        )}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'username', 'password1', 'password2'),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'last_login')
