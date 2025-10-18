# Quick Start Guide

## Setup in 5 Minutes

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # phone: +1234567890
python manage.py runserver
```

### 2. Create Guest Account (Optional)
In another terminal:
```bash
cd backend
source venv/bin/activate
python manage.py shell
```
Then in Python shell:
```python
from accounts.models import User
User.objects.create_user(phone='+10000000000', username='guest', password='guest123')
exit()
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
bun install  # or: npm install
bun dev      # or: npm run dev
```

### 4. Access the App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

### 5. Login
Use the guest credentials:
- Phone: `+10000000000`
- Password: `guest123`

## Testing on Mobile

### Option 1: Browser DevTools
1. Open http://localhost:3000
2. Open browser DevTools (F12)
3. Click "Toggle Device Toolbar" or press Ctrl+Shift+M
4. Select a mobile device (iPhone, Android)

### Option 2: Local Network
1. Find your computer's IP address:
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`

2. Update frontend `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://YOUR_IP:8000/api
   ```

3. Update backend `settings.py`:
   ```python
   ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'YOUR_IP']
   CORS_ALLOWED_ORIGINS = ['http://YOUR_IP:3000']
   ```

4. Access from mobile: `http://YOUR_IP:3000`

## Troubleshooting

### Frontend Issues
- **Module not found**: Run `bun install` or `npm install`
- **Port already in use**: Change port with `PORT=3001 bun dev`
- **API connection error**: Check backend is running on port 8000

### Backend Issues
- **Migration errors**: Delete `db.sqlite3` and run migrations again
- **Import errors**: Make sure virtual environment is activated
- **Port already in use**: Change port with `python manage.py runserver 8001`

### Desktop Block
If you see "Mobile Only" message:
- Use browser DevTools mobile emulation
- Or temporarily comment out the MobileCheck wrapper in `frontend/app/layout.tsx`

## Common Commands

### Backend
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver

# Django shell
python manage.py shell
```

### Frontend
```bash
# Install dependencies
bun install  # or npm install

# Run dev server
bun dev  # or npm run dev

# Build for production
bun run build  # or npm run build

# Run production server
bun start  # or npm start
```

## Next Steps

1. Explore the app interface
2. Create some test channels in Django admin
3. Try following/unfollowing channels
4. Test the discover page
5. Edit your profile in account settings

Enjoy building with CyberFlow! 🚀
