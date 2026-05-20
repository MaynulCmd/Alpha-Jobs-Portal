import { NextRequest, NextResponse } from 'next/server'

// Mock job database
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Tech Solutions',
    description: 'Looking for an experienced React developer...',
    location: 'Riyadh, Saudi Arabia',
    salary: '15000-20000',
    type: 'full-time',
    status: 'active',
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'Innovation Labs',
    description: 'Join our team as a Full Stack Engineer...',
    location: 'Dubai, UAE',
    salary: '18000-25000',
    type: 'full-time',
    status: 'active',
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (id) {
      const job = mockJobs.find((j) => j.id === id)
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 })
      }
      return NextResponse.json(job, { status: 200 })
    }

    return NextResponse.json(mockJobs, { status: 200 })
  } catch (error) {
    console.error('[v0] Jobs API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, description, location, salary, type } = body

    if (!title || !company || !location) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      company,
      description,
      location,
      salary,
      type,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error('[v0] Job creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
