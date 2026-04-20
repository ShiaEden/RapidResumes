import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RapidResumes — Build a stunning resume in minutes',
  description: 'Free resume builder with 13+ beautiful templates, live preview, PDF export, and smart location autocomplete. No account needed.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'RapidResumes',
    description: 'Build a stunning resume in minutes — free, no account needed.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}
