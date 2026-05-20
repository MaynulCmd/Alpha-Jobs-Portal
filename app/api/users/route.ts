import { NextRequest, NextResponse } from 'next/server'

// Mock users database
const mockUsers = [
  {
    id: '1',
    name: 'Ahmad Hassan',
    email: 'ahmad@email.com',
    role: 'job_seeker',
    status: 'active',
    createdAt: '2024-05-01',
  },
  {
    id: '2',
    name: 'Tech Solutions Inc',
    email: 'info@techsolutions.com',
    role: 'employer',
    status: 'active',
    createdAt: '2024-04-15',
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (id) {
      const user = mockUsers.find((u) => u.id === id)
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      return NextResponse.json(user, { status: 200 })
    }

    return NextResponse.json(mockUsers, { status: 200 })
  } catch (error) {
    console.error('[v0] Users API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }

    return NextResponse.json(mockUsers[userIndex], { status: 200 })
  } catch (error) {
    console.error('[v0] User update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    mockUsers.splice(userIndex, 1)

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] User deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
