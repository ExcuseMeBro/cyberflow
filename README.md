<div align="center">
  <h1>🎮 CyberFlow</h1>
  <p><strong>All-in-One Gaming Fintech Platform</strong></p>

  <p>A comprehensive mobile-first gaming fintech ecosystem combining live streaming, esports, and financial services.</p>

  ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
  ![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-api-documentation">API</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Models](#-database-models)
- [Mobile-Only Enforcement](#-mobile-only-enforcement)
- [Guest Account](#-guest-account)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

**CyberFlow** is a next-generation gaming platform that merges the best of live streaming, esports, and fintech into one seamless mobile experience. Built for gamers, streamers, and esports enthusiasts, CyberFlow provides a comprehensive ecosystem for content creation, community engagement, and financial transactions.

### Why CyberFlow?

- 🎯 **Mobile-First**: Exclusively designed for mobile devices, optimized for gaming on the go
- 💰 **Fintech Integration**: Built-in wallet, subscriptions, donations, and tournament payments
- 🏆 **Esports Ready**: Tournament management, team features, and competitive gaming
- 🎨 **Modern UI**: Clean, intuitive interface built with NextUI and Tailwind CSS
- 🔐 **Secure**: Phone-based authentication with JWT tokens
- ⚡ **Fast**: Next.js frontend with Django REST backend for optimal performance

---

## ✨ Features

### 🎮 Gaming & Entertainment

| Feature | Description |
|---------|-------------|
| **Live Streaming** | Browse live gaming channels, tournaments, and esports events |
| **Channel Profiles** | Professional streamer profiles with tabs, follow/subscribe functionality |
| **Discovery Feed** | Search and explore games, categories, tournaments, and live channels |
| **Content Library** | VODs, clips, highlights, and gaming content on demand |
| **Tournament System** | Organized esports competitions with brackets and schedules |
| **Category Browse** | Explore content by game, genre, or interest |

### 💎 Fintech Integration

| Feature | Description |
|---------|-------------|
| **Digital Wallet** | Integrated cryptocurrency and fiat wallet system |
| **Subscriptions** | Multi-tier subscription system for creators (Basic/Premium/VIP) |
| **Donations** | Real-time donation system with instant payouts |
| **Tournament Fees** | Secure payment processing for esports entry fees |
| **In-App Purchases** | Virtual goods, emotes, badges, and premium features |
| **Creator Payouts** | Automated revenue sharing and payment distribution |
| **Transaction History** | Complete financial activity tracking |

### 🎯 Platform Features

| Feature | Description |
|---------|-------------|
| **Mobile-Only UI** | Optimized exclusively for mobile gaming and viewing experience |
| **Phone Authentication** | Secure OTP-style login with guest account support |
| **User Profiles** | Comprehensive profile management with gaming stats |
| **Social Integration** | Links to Discord, YouTube, Twitter, Instagram, Facebook, Telegram, LinkedIn |
| **Modern UI Design** | Sleek interface using NextUI and Tailwind CSS |
| **REST API** | Full Django REST Framework backend with JWT authentication |
| **Admin Panel** | Comprehensive Django admin with DaisyUI theme |
| **State Management** | Efficient state handling with Zustand |

---

## 🛠 Tech Stack

### Frontend Stack

<table>
  <tr>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
      <br><strong>Next.js 14</strong>
      <br><small>App Router</small>
    </td>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
      <br><strong>TypeScript</strong>
      <br><small>Type Safety</small>
    </td>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind" />
      <br><strong>Tailwind CSS</strong>
      <br><small>Styling</small>
    </td>
    <td align="center" width="140">
      <img src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png" width="48" height="48" alt="NextUI" />
      <br><strong>NextUI</strong>
      <br><small>Components</small>
    </td>
  </tr>
</table>

**Additional Frontend Technologies:**
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library

### Backend Stack

<table>
  <tr>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" width="48" height="48" alt="Django" />
      <br><strong>Django 4.2+</strong>
      <br><small>Framework</small>
    </td>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="48" height="48" alt="Python" />
      <br><strong>Python 3.10+</strong>
      <br><small>Language</small>
    </td>
    <td align="center" width="140">
      <img src="https://www.django-rest-framework.org/img/logo.png" width="48" height="48" alt="DRF" />
      <br><strong>DRF</strong>
      <br><small>REST API</small>
    </td>
    <td align="center" width="140">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="48" height="48" alt="PostgreSQL" />
      <br><strong>PostgreSQL</strong>
      <br><small>Database</small>
    </td>
  </tr>
</table>

**Additional Backend Technologies:**
- **djangorestframework-simplejwt** - JWT authentication
- **django-cors-headers** - CORS support
- **Pillow** - Image processing
- **SQLite** - Default database (PostgreSQL ready)
- **DaisyUI** - Admin panel theming

---

## 📸 Screenshots

> **Note:** Screenshots coming soon! Test the application using mobile emulation in your browser.

**Pages Implemented:**
- 🔐 Login Page with Guest Credentials
- 🏠 Home Feed with Categories & Channels
- 👤 Channel Profile with Tabs
- 🔍 Discover Page with Search
- ⚙️ Account Settings
- ✏️ Edit Profile with Social Links
- 📚 Library Page

---

## 🚀 Quick Start

Get CyberFlow running on your machine in under 5 minutes!

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ or **Bun** (recommended) - [Download](https://bun.sh)
- **Python** 3.10+ - [Download](https://python.org)
- **Git** - [Download](https://git-scm.com)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/cyberflow.git
cd cyberflow
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your settings (optional for development)

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser
# Use phone format: +1234567890

# (Optional) Create guest account
python manage.py shell
```

In the Python shell:
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

```bash
# Start the development server
python manage.py runserver
```

✅ Backend running at: **http://localhost:8000**
✅ Admin panel at: **http://localhost:8000/admin**

#### 3️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (choose one)
bun install        # Recommended - fastest
# OR
npm install
# OR
yarn install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local if needed (default settings work)

# Start development server (choose one)
bun dev           # Recommended
# OR
npm run dev
# OR
yarn dev
```

✅ Frontend running at: **http://localhost:3000**

#### 4️⃣ Access the Application

1. Open your browser and enable mobile device emulation:
   - **Chrome/Edge**: Press `F12` → Click device toggle icon (or `Ctrl+Shift+M`)
   - **Firefox**: Press `F12` → Click responsive design mode icon (or `Ctrl+Shift+M`)
   - **Safari**: Enable Develop menu → Enter Responsive Design Mode

2. Navigate to: **http://localhost:3000**

3. Login with guest account:
   - **Phone:** `+10000000000`
   - **Password:** `guest123`

---

## 📁 Project Structure

```
cyberflow/
│
├── 📱 frontend/                    # Next.js Frontend Application
│   ├── app/                       # App Router (Pages)
│   │   ├── auth/login/           # Authentication
│   │   ├── home/                 # Home Feed
│   │   ├── channel/[id]/         # Channel Profile
│   │   ├── discover/             # Discovery Page
│   │   ├── account/              # Account Settings
│   │   │   └── edit/            # Edit Profile
│   │   └── library/              # User Library
│   │
│   ├── components/               # Reusable UI Components
│   │   ├── MobileCheck.tsx      # Mobile Enforcement
│   │   ├── BottomNav.tsx        # Navigation Bar
│   │   ├── VideoCard.tsx        # Stream Card
│   │   ├── CategoryCard.tsx     # Category Card
│   │   └── ChannelCard.tsx      # Channel Avatar
│   │
│   ├── store/                    # State Management
│   │   └── authStore.ts         # Zustand Auth Store
│   │
│   ├── lib/                      # Utilities
│   │   ├── api.ts               # Axios API Client
│   │   └── mockData.ts          # Mock Data
│   │
│   ├── types/                    # TypeScript Definitions
│   │   └── index.ts             # Shared Types
│   │
│   ├── public/                   # Static Assets
│   ├── tailwind.config.ts       # Tailwind Configuration
│   ├── tsconfig.json            # TypeScript Config
│   ├── next.config.js           # Next.js Config
│   └── package.json             # Dependencies
│
└── 🐍 backend/                    # Django Backend Application
    ├── cyberflow/                # Project Settings
    │   ├── settings.py           # Main Settings
    │   ├── urls.py               # URL Configuration
    │   ├── wsgi.py               # WSGI Config
    │   └── asgi.py               # ASGI Config
    │
    ├── accounts/                 # User Authentication App
    │   ├── models.py             # User Model
    │   ├── views.py              # Auth Views
    │   ├── serializers.py        # DRF Serializers
    │   ├── urls.py               # Auth URLs
    │   └── admin.py              # Admin Config
    │
    ├── streams/                  # Streaming App
    │   ├── models.py             # Channel, Stream, Category
    │   ├── views.py              # Stream Views
    │   ├── serializers.py        # DRF Serializers
    │   ├── urls.py               # Stream URLs
    │   └── admin.py              # Admin Config
    │
    ├── templates/                # Django Templates
    │   └── admin/                # Custom Admin Theme
    │
    ├── static/                   # Static Files
    │   └── admin/css/            # Admin Styles
    │
    ├── media/                    # User Uploads
    ├── manage.py                 # Django CLI
    └── requirements.txt          # Python Dependencies
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/login/` | Login with phone & password | No |
| `POST` | `/auth/register/` | Register new user | No |
| `POST` | `/auth/token/refresh/` | Refresh JWT token | No |
| `GET` | `/auth/profile/` | Get current user profile | Yes |
| `PATCH` | `/auth/profile/` | Update user profile | Yes |

**Login Request:**
```json
{
  "phone": "+10000000000",
  "password": "guest123"
}
```

**Login Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "phone": "+10000000000",
    "username": "guest",
    "display_name": "Guest User"
  }
}
```

### Streams Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/streams/` | List all streams | No |
| `GET` | `/streams/live/` | List live streams only | No |
| `GET` | `/streams/recommended/` | Get recommended streams | Yes |
| `GET` | `/streams/{id}/` | Get stream details | No |

### Channels Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/channels/` | List all channels | No |
| `GET` | `/channels/{id}/` | Get channel details | No |
| `POST` | `/channels/{id}/follow/` | Follow a channel | Yes |
| `POST` | `/channels/{id}/unfollow/` | Unfollow a channel | Yes |
| `POST` | `/channels/{id}/subscribe/` | Subscribe to channel | Yes |

### Categories Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/categories/` | List all categories | No |
| `GET` | `/categories/followed/` | Get followed categories | Yes |
| `GET` | `/categories/{id}/` | Get category details | No |

### Schedules Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/schedules/` | List scheduled streams | No |

---

## 🗄 Database Models

### User Model (Custom)
```python
User
├── phone (unique, login)
├── username
├── display_name
├── bio
├── avatar (image upload)
├── social_discord
├── social_youtube
├── social_twitter
├── social_instagram
├── social_facebook
├── social_telegram
├── social_linkedin
├── created_at
└── updated_at
```

### Channel Model
```python
Channel
├── user (one-to-one)
├── name
├── description
├── banner (image)
├── is_live
├── follower_count
├── created_at
└── updated_at
```

### Stream Model
```python
Stream
├── channel (foreign key)
├── category (foreign key)
├── title
├── thumbnail (image)
├── is_live
├── viewer_count
├── started_at
├── ended_at
└── created_at
```

### Other Models
- **Category** - Gaming categories
- **Follow** - User-Channel relationships
- **Subscription** - Paid subscriptions (Basic/Premium/VIP)
- **Schedule** - Upcoming stream schedules

---

## 📱 Mobile-Only Enforcement

CyberFlow is designed exclusively for mobile devices. The platform includes:

### Detection Methods
- ✅ User agent string analysis
- ✅ Screen width monitoring (< 768px)
- ✅ Touch capability detection
- ✅ Real-time viewport tracking

### Implementation
Located in `frontend/components/MobileCheck.tsx`:

```typescript
const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile'];
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
};
```

### Testing on Desktop
To test the application on desktop:

1. **Chrome DevTools:**
   - Press `F12`
   - Click "Toggle device toolbar" (Ctrl+Shift+M)
   - Select a mobile device (iPhone 12 Pro, etc.)

2. **Firefox Responsive Design:**
   - Press `F12`
   - Click "Responsive Design Mode" (Ctrl+Shift+M)
   - Choose a mobile preset

3. **Safari:**
   - Enable "Develop" menu in preferences
   - Select "Enter Responsive Design Mode"

---

## 🎭 Guest Account

For quick testing without registration:

```
Phone: +10000000000
Password: guest123
```

This account comes pre-configured and is perfect for exploring all features of the platform.

---

## 💻 Development

### Running Tests

**Backend (Coming Soon):**
```bash
cd backend
python manage.py test
```

**Frontend (Coming Soon):**
```bash
cd frontend
bun test  # or npm test
```

### Code Quality

**Backend Linting:**
```bash
flake8 backend/
black backend/
```

**Frontend Linting:**
```bash
cd frontend
npm run lint
```

### Building for Production

**Frontend:**
```bash
cd frontend
bun run build
bun start
```

**Backend:**
```bash
cd backend
python manage.py collectstatic
gunicorn cyberflow.wsgi:application
```

---

## 🗺 Roadmap

### Phase 1: Core Platform ✅ (Complete)
- [x] User authentication system
- [x] Channel & stream management
- [x] Category browsing
- [x] Follow/Subscribe system
- [x] Profile management
- [x] Mobile-first UI
- [x] Admin panel

### Phase 2: Live Streaming 🚧 (In Progress)
- [ ] WebRTC integration
- [ ] Low-latency streaming
- [ ] Stream key generation
- [ ] OBS integration
- [ ] Video transcoding
- [ ] CDN integration

### Phase 3: Real-Time Features 📋 (Planned)
- [ ] Live chat system
- [ ] Real-time reactions
- [ ] Viewer count tracking
- [ ] Live notifications
- [ ] Stream alerts
- [ ] Emotes & badges

### Phase 4: Fintech Integration 💰 (Planned)
- [ ] Cryptocurrency wallet
- [ ] Fiat payment gateways
- [ ] Subscription payments
- [ ] Donation system
- [ ] Tournament entry fees
- [ ] Creator payouts
- [ ] Transaction history
- [ ] KYC/AML compliance

### Phase 5: Esports Features 🏆 (Planned)
- [ ] Tournament brackets
- [ ] Team management
- [ ] Matchmaking system
- [ ] Ranking & leaderboards
- [ ] Achievement system
- [ ] Replay system
- [ ] Analytics dashboard

### Phase 6: Enhanced UX 🎨 (Planned)
- [ ] Push notifications
- [ ] Clip creation
- [ ] Highlight reels
- [ ] Multi-language support
- [ ] Dark/Light themes
- [ ] Accessibility features
- [ ] Offline mode

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for all frontend code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

### Areas We Need Help

- 🎨 UI/UX improvements
- 🐛 Bug fixes
- 📝 Documentation
- 🌍 Internationalization
- ⚡ Performance optimization
- 🧪 Test coverage

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 CyberFlow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🆘 Support

### Documentation

- 📚 [Quick Start Guide](QUICKSTART.md)
- 🏗 [Project Structure](PROJECT_STRUCTURE.md)
- 📊 [Project Summary](SUMMARY.md)

### Getting Help

1. **Check the documentation** - Most questions are answered in our docs
2. **Review existing issues** - Your question might already be answered
3. **Open a new issue** - For bugs or feature requests
4. **Join our community** - Discord server (coming soon)

### Troubleshooting

**Frontend not loading?**
- Check if backend is running on port 8000
- Verify CORS settings in Django
- Clear browser cache and cookies

**Backend errors?**
- Check Python virtual environment is activated
- Verify all migrations are applied
- Check Django logs for details

**Mobile check blocking desktop?**
- Enable mobile emulation in browser DevTools
- Temporarily disable MobileCheck component for testing

---

## 🌟 Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - The React Framework
- [Django](https://www.djangoproject.com/) - The Web Framework for Perfectionists
- [NextUI](https://nextui.org/) - Beautiful UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Django REST Framework](https://www.django-rest-framework.org/) - Powerful REST APIs

---

## 📞 Contact

**Project Maintainer:** Your Name

- 🌐 Website: [cyberflow.io](https://cyberflow.io)
- 📧 Email: contact@cyberflow.io
- 🐦 Twitter: [@cyberflow](https://twitter.com/cyberflow)
- 💬 Discord: [Join our server](https://discord.gg/cyberflow)

---

<div align="center">
  <h3>⭐️ Star us on GitHub if you find this project useful!</h3>

  <p>
    <strong>CyberFlow</strong> - Powering the Future of Gaming & Esports through Innovative Fintech Solutions
  </p>

  <p>
    <sub>Built with ❤️ by the CyberFlow Team</sub>
  </p>

  <p>
    <a href="#-table-of-contents">Back to Top ↑</a>
  </p>
</div>
