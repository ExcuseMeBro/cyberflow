# Django Management Commands Reference

## Database Commands

### Migrations
```bash
# Create new migrations based on model changes
python manage.py makemigrations

# Show migrations
python manage.py showmigrations

# Apply all migrations
python manage.py migrate

# Apply specific app migrations
python manage.py migrate accounts

# Roll back migration
python manage.py migrate accounts 0001

# Show SQL for migration
python manage.py sqlmigrate accounts 0001
```

### Database Shell
```bash
# Open Django shell
python manage.py shell

# Open database shell
python manage.py dbshell
```

## User Management

### Create Superuser
```bash
python manage.py createsuperuser
```

### Create Test Users (in shell)
```python
from accounts.models import User

# Create regular user
user = User.objects.create_user(
    phone='+1234567890',
    username='testuser',
    password='testpass123',
    display_name='Test User'
)

# Create guest account
guest = User.objects.create_user(
    phone='+10000000000',
    username='guest',
    password='guest123',
    display_name='Guest User'
)
```

## Server Commands

### Run Development Server
```bash
# Default (port 8000)
python manage.py runserver

# Custom port
python manage.py runserver 8001

# Listen on all interfaces
python manage.py runserver 0.0.0.0:8000
```

## Static Files

```bash
# Collect static files
python manage.py collectstatic

# Clear static files
python manage.py collectstatic --clear
```

## Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test accounts

# Run with verbosity
python manage.py test --verbosity=2
```

## Data Management

### Load/Dump Data
```bash
# Dump data to JSON
python manage.py dumpdata > data.json
python manage.py dumpdata accounts > accounts.json

# Load data from JSON
python manage.py loaddata data.json
```

### Create Sample Data (in shell)
```python
from accounts.models import User
from streams.models import Channel, Category, Stream

# Create categories
categories = [
    Category.objects.create(name='Gaming', slug='gaming'),
    Category.objects.create(name='Music', slug='music'),
    Category.objects.create(name='Talk Shows', slug='talk-shows'),
]

# Create users with channels
for i in range(1, 6):
    user = User.objects.create_user(
        phone=f'+100000000{i}',
        username=f'user{i}',
        password='testpass123',
        display_name=f'User {i}'
    )

    channel = Channel.objects.create(
        user=user,
        name=f'Channel {i}',
        description=f'This is channel {i}',
        is_live=(i % 2 == 0),
        followers_count=1000 * i
    )

    # Create streams for each channel
    Stream.objects.create(
        channel=channel,
        category=categories[i % len(categories)],
        title=f'Stream from {channel.name}',
        is_live=(i % 2 == 0),
        viewer_count=500 * i
    )
```

## Utility Commands

### Check Deployment
```bash
python manage.py check --deploy
```

### Clear Cache
```bash
python manage.py clear_cache
```

### Show URLs
```bash
python manage.py show_urls
```

## Custom Management Commands

You can create custom commands in `appname/management/commands/`.

Example: `accounts/management/commands/create_test_data.py`
```python
from django.core.management.base import BaseCommand
from accounts.models import User

class Command(BaseCommand):
    help = 'Creates test data'

    def handle(self, *args, **options):
        User.objects.create_user(
            phone='+10000000000',
            username='guest',
            password='guest123'
        )
        self.stdout.write(
            self.style.SUCCESS('Successfully created test data')
        )
```

Run with:
```bash
python manage.py create_test_data
```
