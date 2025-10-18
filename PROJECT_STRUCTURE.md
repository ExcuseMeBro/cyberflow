# CyberFlow Project Structure

## Overview

```
cyberflow/
├── frontend/                    # Next.js Frontend Application
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Root redirect page
│   │   ├── globals.css        # Global styles
│   │   ├── providers.tsx      # NextUI provider setup
│   │   │
│   │   ├── auth/              # Authentication pages
│   │   │   └── login/
│   │   │       └── page.tsx   # Login page with guest credentials
│   │   │
│   │   ├── home/              # Main feed page
│   │   │   └── page.tsx       # Home with categories, channels, streams
│   │   │
│   │   ├── channel/[id]/      # Dynamic channel pages
│   │   │   └── page.tsx       # Channel profile with tabs
│   │   │
│   │   ├── discover/          # Discovery & search page
│   │   │   └── page.tsx       # Browse categories and streams
│   │   │
│   │   ├── account/           # Account management
│   │   │   ├── page.tsx       # Account settings menu
│   │   │   └── edit/
│   │   │       └── page.tsx   # Profile editing page
│   │   │
│   │   └── library/           # User library page
│   │       └── page.tsx       # Saved content and history
│   │
│   ├── components/            # Reusable React components
│   │   ├── MobileCheck.tsx   # Mobile-only enforcement
│   │   ├── BottomNav.tsx     # Bottom navigation bar
│   │   ├── VideoCard.tsx     # Stream/video card component
│   │   ├── CategoryCard.tsx  # Category card component
│   │   └── ChannelCard.tsx   # Channel avatar card
│   │
│   ├── store/                 # Zustand state management
│   │   └── authStore.ts      # Authentication state
│   │
│   ├── lib/                   # Utilities and helpers
│   │   ├── api.ts            # Axios API client setup
│   │   └── mockData.ts       # Mock data for development
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts          # Shared types
│   │
│   ├── public/                # Static assets
│   ├── tailwind.config.ts    # Tailwind configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── next.config.js        # Next.js configuration
│   ├── package.json          # Dependencies
│   └── .env.local.example    # Environment variables template
│
└── backend/                   # Django Backend Application
    ├── cyberflow/            # Django project settings
    │   ├── __init__.py
    │   ├── settings.py       # Main settings file
    │   ├── urls.py           # Root URL configuration
    │   ├── wsgi.py           # WSGI configuration
    │   └── asgi.py           # ASGI configuration
    │
    ├── accounts/             # User authentication app
    │   ├── models.py         # User model (phone-based auth)
    │   ├── views.py          # Authentication views
    │   ├── serializers.py    # DRF serializers
    │   ├── urls.py           # Auth URL patterns
    │   ├── admin.py          # Admin configuration
    │   └── apps.py           # App configuration
    │
    ├── streams/              # Streaming functionality app
    │   ├── models.py         # Channel, Stream, Category, etc.
    │   ├── views.py          # Stream API views
    │   ├── serializers.py    # DRF serializers
    │   ├── urls.py           # Stream URL patterns
    │   ├── admin.py          # Admin configuration
    │   └── apps.py           # App configuration
    │
    ├── templates/            # Django templates
    │   └── admin/
    │       └── base_site.html # Custom admin template
    │
    ├── static/               # Static files
    │   └── admin/
    │       └── css/
    │           └── custom.css # Custom admin styles
    │
    ├── media/                # User uploaded files (created at runtime)
    ├── manage.py             # Django management script
    ├── requirements.txt      # Python dependencies
    ├── .env.example          # Environment variables template
    └── .gitignore            # Git ignore rules

```

## Key Files Explained

### Frontend

#### Core Configuration
- **`app/layout.tsx`**: Root layout with NextUI providers and MobileCheck
- **`app/providers.tsx`**: NextUI provider configuration
- **`tailwind.config.ts`**: Tailwind CSS + NextUI theme setup
- **`next.config.js`**: Next.js configuration with image domains

#### Components
- **`MobileCheck.tsx`**: Enforces mobile-only access, blocks desktop users
- **`BottomNav.tsx`**: Persistent bottom navigation (Home, Discover, Library, Account)
- **`VideoCard.tsx`**: Displays stream/video with thumbnail, title, channel, viewers
- **`CategoryCard.tsx`**: Shows game/category with thumbnail
- **`ChannelCard.tsx`**: Circular avatar with channel name and live badge

#### State Management
- **`store/authStore.ts`**: Zustand store for authentication
  - User state
  - JWT token management
  - Login/logout actions
  - Persistent storage

#### API Layer
- **`lib/api.ts`**: Axios instance with interceptors
  - JWT token injection
  - API endpoints organization
  - Error handling
- **`lib/mockData.ts`**: Development mock data
  - Sample channels
  - Sample streams
  - Sample categories

### Backend

#### Django Apps

**accounts/** - User Management
- Custom User model with phone-based authentication
- JWT token authentication
- Profile management
- Social media links storage

**streams/** - Streaming Platform
- Channel management
- Stream/video management
- Category system
- Follow/Subscribe functionality
- Scheduled streams

#### Models

**User** (accounts/models.py)
- Phone number (unique, login)
- Username, display name
- Bio, avatar
- Social media links
- Timestamps

**Channel** (streams/models.py)
- One-to-one with User
- Name, banner, description
- Live status
- Follower count

**Stream** (streams/models.py)
- Belongs to Channel
- Category relationship
- Title, thumbnail
- Live status, viewer count
- Timestamps

**Category** (streams/models.py)
- Name, slug, thumbnail
- Description
- Viewer count

**Follow** (streams/models.py)
- User → Channel relationship
- Timestamp

**Subscription** (streams/models.py)
- User → Channel relationship
- Tier (basic/premium/vip)
- Active status
- Expiration date

**Schedule** (streams/models.py)
- Upcoming stream schedule
- Channel, category
- Scheduled time

#### API Endpoints

**Authentication**
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Register
- `GET /api/auth/profile/` - Get profile
- `PATCH /api/auth/profile/` - Update profile

**Streams**
- `GET /api/streams/` - List streams
- `GET /api/streams/live/` - Live streams
- `GET /api/streams/recommended/` - Recommended

**Channels**
- `GET /api/channels/` - List channels
- `GET /api/channels/{id}/` - Channel details
- `POST /api/channels/{id}/follow/` - Follow
- `POST /api/channels/{id}/unfollow/` - Unfollow
- `POST /api/channels/{id}/subscribe/` - Subscribe

**Categories**
- `GET /api/categories/` - List categories
- `GET /api/categories/followed/` - Followed

## Technology Stack

### Frontend Technologies
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **NextUI**: Pre-built component library
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **Framer Motion**: Animation library (NextUI dependency)

### Backend Technologies
- **Django 4.2+**: Python web framework
- **Django REST Framework**: API framework
- **djangorestframework-simplejwt**: JWT authentication
- **django-cors-headers**: CORS support
- **Pillow**: Image processing
- **SQLite**: Default database (PostgreSQL ready)

### Development Tools
- **Bun/npm**: Package management
- **ESLint**: Code linting
- **Python venv**: Virtual environment

## Design Patterns

### Frontend Patterns
- **Component-Based Architecture**: Reusable UI components
- **Server Components**: Default in Next.js App Router
- **Client Components**: For interactivity (marked with 'use client')
- **Custom Hooks**: Zustand stores
- **API Layer Abstraction**: Centralized API calls

### Backend Patterns
- **REST API**: Standard HTTP methods
- **Model-View-Serializer**: DRF pattern
- **JWT Authentication**: Stateless auth
- **Serializer Composition**: Nested serializers
- **ViewSet Actions**: Custom endpoints

## Mobile-First Design

### Enforcement Strategy
1. **User Agent Detection**: Checks for mobile keywords
2. **Screen Width Check**: Monitors viewport width
3. **Block Page**: Full-screen message for desktop
4. **Responsive Design**: Mobile-optimized layouts

### UI/UX Features
- Bottom navigation (easy thumb access)
- Large touch targets
- Swipeable carousels
- Pull-to-refresh ready
- Optimized for portrait orientation

## Future Expansion Points

### Frontend
- Add WebRTC for actual streaming
- Implement real-time chat (WebSocket)
- Add video player component
- Implement search functionality
- Add notifications system

### Backend
- WebRTC signaling server
- Real-time chat (Django Channels)
- Video processing pipeline
- Payment integration
- Analytics system
- CDN integration

## Security Considerations

### Current Implementation
- JWT token authentication
- CORS configuration
- Password hashing (Django default)
- CSRF protection
- Phone number validation

### Production Requirements
- HTTPS enforcement
- Rate limiting
- Input validation
- File upload restrictions
- Environment variable security
- Database security (PostgreSQL)
- Backup strategy

## Performance Optimization

### Frontend
- Next.js automatic code splitting
- Image optimization (next/image)
- Static page generation where possible
- Client-side caching (Zustand persist)
- Lazy loading components

### Backend
- Database query optimization
- API pagination
- Static file serving
- Database indexing
- Caching strategy (Redis ready)

## Testing Strategy

### Frontend Testing (To Implement)
- Jest for unit tests
- React Testing Library for components
- Playwright/Cypress for E2E
- TypeScript for type safety

### Backend Testing (To Implement)
- Django TestCase for models
- APITestCase for endpoints
- Factory Boy for test data
- Coverage reporting

---

This structure provides a solid foundation for a mobile streaming platform with room for growth and feature additions.
