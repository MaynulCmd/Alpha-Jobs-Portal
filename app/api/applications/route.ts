import { NextRequest, NextResponse } from 'next/server'

// Mock applications database
const mockApplications = [
  {
    id: '1',
    jobId: '1',
    userId: 'user1',
    status: 'pending',
    appliedDate: '2024-05-10',
    resume: 'resume.pdf',
  },
  {
    id: '2',
    jobId: '2',
    userId: 'user1',
    status: 'accepted',
    appliedDate: '2024-05-08',
    resume: 'resume.pdf',
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const jobId = searchParams.get('jobId')

    let filtered = mockApplications

    if (userId) {
      filtered = filtered.filter((app) => app.userId === userId)
    }

    if (jobId) {
      filtered = filtered.filter((app) => app.jobId === jobId)
    }

    return NextResponse.json(filtered, { status: 200 })
  } catch (error) {
    console.error('[v0] Applications API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, userId, resume } = body

    if (!jobId || !userId) {
      return NextResponse.json(
        { error: 'Job ID and User ID are required' },
        { status: 400 }
      )
    }

    const newApplication = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      userId,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      resume,
    }

    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.error('[v0] Application creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
