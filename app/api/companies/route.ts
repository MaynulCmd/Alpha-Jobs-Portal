import { NextRequest, NextResponse } from 'next/server'

// Mock companies database
const mockCompanies = [
  {
    id: '1',
    name: 'Tech Solutions Inc',
    email: 'info@techsolutions.com',
    location: 'Riyadh, Saudi Arabia',
    industry: 'Technology',
    description: 'Leading tech solutions provider',
    status: 'verified',
  },
  {
    id: '2',
    name: 'Innovation Labs',
    email: 'hello@innovationlabs.com',
    location: 'Dubai, UAE',
    industry: 'Technology',
    description: 'Innovation-focused tech company',
    status: 'pending',
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (id) {
      const company = mockCompanies.find((c) => c.id === id)
      if (!company) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(company, { status: 200 })
    }

    return NextResponse.json(mockCompanies, { status: 200 })
  } catch (error) {
    console.error('[v0] Companies API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, location, industry, description } = body

    if (!name || !email || !location) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const newCompany = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      location,
      industry,
      description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newCompany, { status: 201 })
  } catch (error) {
    console.error('[v0] Company creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
