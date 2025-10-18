# CyberFlow - Mobile-Only Streaming Platform

A modern, mobile-first streaming platform similar to Twitch, built with Next.js (Frontend) and Django (Backend).

## Features

- **Mobile-Only UI**: Designed exclusively for mobile devices with desktop blocking
- **Phone-Based Authentication**: OTP-style login with guest account support
- **Live Streaming Interface**: Browse live channels, categories, and streams
- **Channel Profiles**: Detailed channel pages with tabs, follow/subscribe functionality
- **Discovery Feed**: Search and explore games, categories, and live channels
- **User Accounts**: Profile management with social media links
- **Modern UI**: Clean design using HeroUI (NextUI) and Tailwind CSS
- **REST API**: Full Django REST Framework backend with JWT authentication
- **Admin Panel**: Django admin with DaisyUI theme customization

## Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: NextUI (HeroUI) - Tailwind-based components
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend (`/backend`)
- **Framework**: Django 4.2+
- **API**: Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: SQLite (default), PostgreSQL ready
- **Admin Theme**: DaisyUI + Tailwind CSS
- **CORS**: django-cors-headers

## Project Structure

```
cyberflow/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # App router pages
│   │   ├── auth/           # Authentication pages
│   │   ├── home/           # Home feed
│   │   ├── channel/[id]/   # Channel profile
│   │   ├── discover/       # Discovery page
│   │   ├── account/        # Account settings
│   │   └── library/        # User library
│   ├── components/         # Reusable components
│   ├── store/              # Zustand state management
│   ├── lib/                # Utilities and API
│   └── types/              # TypeScript types
│
└── backend/                 # Django Backend
    ├── cyberflow/          # Project settings
    ├── accounts/           # User authentication app
    ├── streams/            # Streaming app
    ├── templates/          # Admin templates
    └── static/             # Static files

```

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended for frontend)
- **Python** 3.10+
- **pip** or **virtualenv**

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
# Follow prompts - use phone number format: +1234567890
```

7. Create guest account (optional):
```bash
python manage.py shell
```
```python
from accounts.models import User
User.objects.create_user(
    phone='+10000000000',
    username='guest',
    password='guest123',
    display_name='Guest User'
)
exit()
```

8. Run development server:
```bash
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`
Admin panel: `http://localhost:8000/admin`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:

**Using Bun (recommended):**
```bash
bun install
```

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local if needed
```

4. Run development server:

**Using Bun:**
```bash
bun dev
```

**Using npm:**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Guest Account Credentials

For testing without registration:

- **Phone**: `+10000000000`
- **Password**: `guest123`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login with phone and password
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get current user profile
- `PATCH /api/auth/profile/` - Update user profile

### Streams
- `GET /api/streams/` - List all streams
- `GET /api/streams/live/` - List live streams
- `GET /api/streams/recommended/` - Get recommended streams
- `GET /api/streams/{id}/` - Get stream details

### Channels
- `GET /api/channels/` - List all channels
- `GET /api/channels/{id}/` - Get channel details
- `POST /api/channels/{id}/follow/` - Follow channel
- `POST /api/channels/{id}/unfollow/` - Unfollow channel
- `POST /api/channels/{id}/subscribe/` - Subscribe to channel

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/followed/` - Get followed categories
- `GET /api/categories/{id}/` - Get category details

### Schedules
- `GET /api/schedules/` - List scheduled streams

## Pages

### Frontend Routes

- `/` - Root (redirects to /home or /auth/login)
- `/auth/login` - Login page with guest credentials
- `/home` - Main feed with followed categories, channels, and recommendations
- `/channel/[id]` - Channel profile with Home/About/Schedule/Videos tabs
- `/discover` - Discovery page with search and categories
- `/account` - User account settings and menu
- `/account/edit` - Edit profile and social links
- `/library` - User's saved videos and history
- `/desktop-blocked` - Displayed when accessing from desktop

## Mobile-Only Enforcement

The app includes automatic mobile detection that:
- Checks device user agent
- Monitors screen width
- Displays a full-page block message on desktop
- Ensures optimal mobile experience

To bypass for testing:
- Use browser dev tools and enable mobile device emulation
- Or temporarily modify `MobileCheck.tsx` component

## Development Notes

### Database Models

**User Model** (Custom):
- Phone-based authentication
- Username, display name, bio
- Avatar upload
- Social media links (Discord, YouTube, Twitter, Instagram, Facebook, Telegram, LinkedIn)

**Channel Model**:
- One-to-one with User
- Banner image
- Live status
- Follower count

**Stream Model**:
- Belongs to Channel
- Category relationship
- Live status
- Viewer count
- Timestamps

**Category Model**:
- Name and slug
- Thumbnail
- Viewer count

**Follow Model**:
- User-Channel relationship
- Timestamps

**Subscription Model**:
- User-Channel relationship
- Tier (basic/premium/vip)
- Active status
- Expiration

**Schedule Model**:
- Upcoming stream schedules
- Channel and category
- Scheduled time

### State Management

Zustand store (`/frontend/store/authStore.ts`):
- User authentication state
- JWT token management
- Login/logout functionality
- Persistent storage

### Styling

The project uses:
- Tailwind CSS for utility-first styling
- NextUI for pre-built components
- Custom purple/pink gradient theme
- Responsive mobile-first design

### Admin Panel

Access the Django admin at `/admin`:
- Custom DaisyUI + Tailwind theme
- Purple gradient branding
- Full CRUD for all models
- User management
- Content moderation

## Future Enhancements

The current implementation is a UI-focused prototype. Future additions could include:

- Actual WebRTC video streaming
- Real-time chat functionality
- Push notifications
- Payment processing for subscriptions
- Analytics dashboard
- Stream recording and VOD
- Clip creation
- Emotes and badges
- Channel points system
- Multi-language support

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Test with the guest account
4. Check Django logs for backend issues
5. Check browser console for frontend issues

---

Built with ❤️ using Next.js, Django, NextUI, and Tailwind CSS
