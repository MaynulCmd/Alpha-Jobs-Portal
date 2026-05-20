import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'Alpha Jobs | Find Your Next Job in Saudi Arabia',
    template: '%s | Alpha Jobs'
  },
  description: 'Ultra-modern Saudi job portal for seekers and employers. Smart, fast, and tailored to the KSA job market. Find jobs in construction, IT, healthcare, and more.',
  keywords: ['jobs', 'saudi arabia', 'ksa', 'employment', 'career', 'job portal', 'hiring', 'recruitment'],
  authors: [{ name: 'Mohammad Maynul Hasan Shaon', url: 'mailto:redarcopc@gmail.com' }],
  creator: 'EAY Quantum Technology',
  publisher: 'Alpha Ultimate Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://alpha-jobs.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alpha Jobs | Find Your Next Job in Saudi Arabia',
    description: 'Ultra-modern Saudi job portal for seekers and employers. Smart, fast, and tailored to the KSA job market.',
    url: '/',
    siteName: 'Alpha Jobs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpha Jobs | Find Your Next Job in Saudi Arabia',
    description: 'Ultra-modern Saudi job portal for seekers and employers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/icons/icon-192x192.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    shortcut: '/icons/icon-32x32.jpg',
    apple: [
      { url: '/icons/apple-icon-180x180.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FACC15' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-background min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
