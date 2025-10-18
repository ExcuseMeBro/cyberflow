import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userType, firstName, lastName, phone, dateOfBirth, password } = body;

    // Validation
    if (!userType || !firstName || !lastName || !phone || !dateOfBirth || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user type is valid
    if (userType !== 'user' && userType !== 'parent') {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Generate username and display name
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
    const displayName = `${firstName} ${lastName}`;

    // Insert user
    const stmt = db.prepare(`
      INSERT INTO users (
        user_type, first_name, last_name, phone, date_of_birth, password,
        username, display_name, bio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      userType,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      hashedPassword,
      username,
      displayName,
      userType === 'user'
        ? 'New gamer on CyberFlow!'
        : 'Parent account with access to child monitoring features.'
    );

    // Get the created user
    const user = db.prepare(`
      SELECT id, user_type, first_name, last_name, phone, date_of_birth, username, display_name, bio, created_at
      FROM users WHERE id = ?
    `).get(result.lastInsertRowid);

    return NextResponse.json({
      message: 'User registered successfully',
      user
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error.message },
      { status: 500 }
    );
  }
}
