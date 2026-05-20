import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, userType } = body

    // Validation
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Placeholder user creation logic
    // In production, this would hash the password and save to database
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      firstName,
      lastName,
      userType,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: newUser,
        token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
