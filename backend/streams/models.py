from django.db import models
from django.conf import settings


class Category(models.Model):
    """Game categories for the gaming platform"""
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
    """Creator/Streamer channels"""
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
    """Live streams and VOD content"""
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
    """User following channels"""
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
    """Channel subscriptions with payment tiers"""
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
    """Scheduled streams"""
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


class Competition(models.Model):
    """Gaming tournaments and competitions"""
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('live', 'Live'),
        ('ended', 'Ended'),
    ]

    title = models.CharField(max_length=255)
    game = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='competitions')
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='competitions/', blank=True, null=True)
    prize = models.CharField(max_length=100)  # e.g., "$10,000" or "500 USDT"
    entry_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    max_participants = models.IntegerField(default=100)
    current_participants = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    progress = models.IntegerField(default=0)  # Percentage (0-100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'competitions'
        ordering = ['start_date']

    def __str__(self):
        return f"{self.title} - {self.game}"


class CompetitionParticipant(models.Model):
    """Players participating in competitions"""
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='competition_entries')
    rank = models.IntegerField(null=True, blank=True)
    points = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'competition_participants'
        unique_together = ('competition', 'user')
        ordering = ['rank']

    def __str__(self):
        return f"{self.user.username} in {self.competition.title}"


class Leaderboard(models.Model):
    """Global leaderboard for players"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leaderboard')
    rank = models.IntegerField(unique=True)
    total_points = models.IntegerField(default=0)
    total_wins = models.IntegerField(default=0)
    total_competitions = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        ordering = ['rank']

    def __str__(self):
        return f"Rank #{self.rank} - {self.user.username}"


class GamingClub(models.Model):
    """Physical gaming clubs/venues"""
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='clubs/', blank=True, null=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=500)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    players_count = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    games = models.JSONField(default=list)  # List of available games
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'gaming_clubs'
        ordering = ['-rating']

    def __str__(self):
        return self.name


class GamingEvent(models.Model):
    """Local gaming events at clubs"""
    club = models.ForeignKey(GamingClub, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    game = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='events/', blank=True, null=True)
    event_date = models.DateTimeField()
    duration_hours = models.IntegerField(default=2)
    max_attendees = models.IntegerField(default=50)
    current_attendees = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'gaming_events'
        ordering = ['event_date']

    def __str__(self):
        return f"{self.title} at {self.club.name}"
