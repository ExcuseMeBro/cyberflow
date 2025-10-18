import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password, userType } = body;

    // Validation
    if (!phone || !password || !userType) {
      return NextResponse.json(
        { error: 'Phone, password, and user type are required' },
        { status: 400 }
      );
    }

    // Find user by phone and user type
    const user: any = db.prepare(`
      SELECT * FROM users WHERE phone = ? AND user_type = ?
    `).get(phone, userType);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user links
    const links: any[] = db.prepare(`
      SELECT platform, url FROM user_links WHERE user_id = ?
    `).all(user.id);

    const linksObject = links.reduce((acc, link) => {
      acc[link.platform] = link.url;
      return acc;
    }, {} as Record<string, string>);

    // Generate token
    const token = generateToken();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: {
        ...userWithoutPassword,
        links: linksObject
      },
      token
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed', details: error.message },
      { status: 500 }
    );
  }
}
