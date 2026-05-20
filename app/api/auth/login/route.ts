import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Placeholder authentication logic
    // In production, this would verify credentials against a database
    if (email && password.length >= 6) {
      return NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          user: {
            id: '1',
            email: email,
            name: 'User',
            role: email.includes('employer') ? 'employer' : 'job_seeker',
          },
          token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('[v0] Auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
