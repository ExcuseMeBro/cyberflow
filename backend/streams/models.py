from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    thumbnail = models.ImageField(upload_to='categories/', blank=True, null=True)
    description = models.TextField(blank=True)
    viewer_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'categories'
        ordering = ['-viewer_count']

    def __str__(self):
        return self.name


class Channel(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='channel')
    name = models.CharField(max_length=150)
    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    description = models.TextField(blank=True)
    is_live = models.BooleanField(default=False)
    followers_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'channels'
        ordering = ['-followers_count']

    def __str__(self):
        return self.name


class Stream(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='streams')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='streams')
    title = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='streams/', blank=True, null=True)
    is_live = models.BooleanField(default=False)
    viewer_count = models.IntegerField(default=0)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'streams'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.channel.name} - {self.title}"


class Follow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following')
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'follows'
        unique_together = ('user', 'channel')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} follows {self.channel.name}"


class Subscription(models.Model):
    TIER_CHOICES = [
        ('basic', 'Basic'),
        ('premium', 'Premium'),
        ('vip', 'VIP'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='subscribers')
    tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='basic')
    is_active = models.BooleanField(default=True)
    started_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'subscriptions'
        unique_together = ('user', 'channel')
        ordering = ['-started_at']

    def __str__(self):
        return f"{self.user.username} subscribed to {self.channel.name}"


class Schedule(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='schedules')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    scheduled_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'schedules'
        ordering = ['scheduled_at']

    def __str__(self):
        return f"{self.channel.name} - {self.title}"
