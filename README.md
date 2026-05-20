# Alpha Jobs - Production Grade PWA Job Portal

A comprehensive, mobile-first Progressive Web Application for job seeking and hiring across the Middle East region.

## Created By

**Mohammad Maynul Hasan Shaon**
- Email: redarcopc@gmail.com
- Location: Riyadh, Kingdom of Saudi Arabia
- Powered by: EAY Quantum Technology

## Features

### For Job Seekers
- User profile management
- CV builder with professional templates
- Job search and filtering
- Job applications tracking
- Saved jobs collection
- Responsive dashboard

### For Employers
- Company profile management
- Job posting and management
- Applicant tracking
- Application reviewing
- Hiring analytics

### For Admins
- Platform user management
- Job moderation
- Company verification
- Platform settings and branding
- Activity monitoring

### Technical Features
- Progressive Web App (PWA) - installable on mobile
- Mobile-first responsive design
- Dark mode support
- Real-time notifications
- Smooth animations
- SEO optimized
- Type-safe with TypeScript

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT-based
- **Password Hashing**: bcryptjs

### Database Ready
- Configured for PostgreSQL (Neon, Supabase, Aurora)
- Mock data structures in place
- Ready for ORM integration (Prisma, Drizzle)

## Getting Started

### Installation

1. **Clone or download the project**
   ```bash
   cd alpha-jobs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```
   NEXT_PUBLIC_APP_NAME=Alpha Jobs
   NEXT_PUBLIC_CREATOR_NAME=Mohammad Maynul Hasan Shaon
   NEXT_PUBLIC_CREATOR_EMAIL=redarcopc@gmail.com
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Install as PWA: Click the install button in address bar (mobile) or use app menu

## Project Structure

```
alpha-jobs/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── jobs/              # Jobs management
│   │   ├── applications/       # Applications API
│   │   ├── users/             # User management
│   │   └── companies/         # Company management
│   ├── (public)/              # Public pages
│   │   ├── page.tsx           # Home
│   │   ├── jobs/              # Job listing and details
│   │   ├── companies/         # Company listing
│   │   ├── about/             # About page
│   │   └── contact/           # Contact page
│   ├── auth/                  # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── seeker/                # Job seeker dashboard
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── cv/
│   │   ├── applications/
│   │   └── saved/
│   ├── employer/              # Employer dashboard
│   │   ├── dashboard/
│   │   ├── company/
│   │   ├── jobs/
│   │   └── applicants/
│   ├── admin/                 # Admin panel
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── jobs/
│   │   ├── companies/
│   │   └── settings/
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── layout/                # Header, Footer, Sidebar
│   ├── cards/                 # Job and Company cards
│   ├── ui/                    # shadcn/ui components
│   └── providers/             # Theme and context providers
├── lib/
│   ├── store.ts               # Zustand state management
│   ├── types.ts               # TypeScript interfaces
│   ├── constants.ts           # App constants
│   ├── mock-data.ts           # Sample data
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
    └── manifest.json          # PWA manifest
```

## Key Pages & Routes

### Public Routes
- `/` - Home page
- `/jobs` - Jobs listing
- `/jobs/[id]` - Job details
- `/companies` - Companies listing
- `/companies/[id]` - Company details
- `/about` - About page
- `/contact` - Contact page

### Auth Routes
- `/auth/login` - Login
- `/auth/register` - Registration
- `/auth/forgot-password` - Password recovery
- `/auth/reset-password` - Password reset

### Job Seeker Routes
- `/seeker/dashboard` - Dashboard
- `/seeker/profile` - Profile management
- `/seeker/cv` - CV builder
- `/seeker/applications` - My applications
- `/seeker/saved` - Saved jobs

### Employer Routes
- `/employer/dashboard` - Dashboard
- `/employer/company` - Company profile
- `/employer/jobs` - Job listings
- `/employer/jobs/new` - Post new job
- `/employer/applicants` - View applicants

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/jobs` - Job moderation
- `/admin/companies` - Company verification
- `/admin/settings` - Platform settings

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs?id=[id]` - Get specific job
- `POST /api/jobs` - Create new job

### Applications
- `GET /api/applications` - List applications
- `GET /api/applications?userId=[id]` - User's applications
- `POST /api/applications` - Submit application

### Users
- `GET /api/users` - List users
- `GET /api/users?id=[id]` - Get user details
- `PUT /api/users` - Update user
- `DELETE /api/users?id=[id]` - Delete user

### Companies
- `GET /api/companies` - List companies
- `GET /api/companies?id=[id]` - Get company details
- `POST /api/companies` - Create company

## Database Integration

The project is ready for database integration. To connect a database:

### Option 1: Neon PostgreSQL (Recommended)
```bash
pnpm add @neondatabase/serverless
```

### Option 2: Supabase
```bash
pnpm add @supabase/supabase-js
```

### Option 3: Prisma ORM
```bash
pnpm add @prisma/client
pnpm add -D prisma
```

Then update the API routes to use real database queries instead of mock data.

## PWA Features

- **Installable**: Add to home screen on mobile
- **Offline Support**: Works with service workers
- **Native Feel**: Full-screen mode available
- **Fast**: Optimized bundle and images
- **Manifest**: Configured in `public/manifest.json`

## Customization

### Theme Colors
Edit `lib/constants.ts` to customize colors:
```typescript
export const COLORS = {
  primary: '#2563eb',    // Blue
  secondary: '#7c3aed',  // Purple
  accent: '#ec4899',     // Pink
  // ... more colors
}
```

### Creator Information
Update in `.env.local`:
```
NEXT_PUBLIC_CREATOR_NAME=Your Name
NEXT_PUBLIC_CREATOR_EMAIL=your@email.com
NEXT_PUBLIC_POWERED_BY=Your Company
```

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Deploy to Other Platforms
The app can be deployed to any Node.js hosting:
- Netlify
- AWS Amplify
- Heroku
- Railway
- Render

## Performance

- Lighthouse Score: 90+
- Mobile First Design
- Optimized Images
- Code Splitting
- CSS Optimization
- SEO Ready

## Security Features

- JWT authentication ready
- Password hashing support (bcryptjs)
- CORS configuration
- Input validation
- SQL injection prevention patterns
- XSS protection with React

## Future Enhancements

- [ ] Real database integration
- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] Video interviews
- [ ] AI job matching
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Video profile support
- [ ] Skill assessments
- [ ] Job recommendations

## Support & Contributing

For support, contact:
- **Email**: redarcopc@gmail.com
- **Location**: Riyadh, Kingdom of Saudi Arabia

## License

Created by Mohammad Maynul Hasan Shaon
Powered by EAY Quantum Technology

---

**Version**: 1.0.0
**Last Updated**: May 2024
