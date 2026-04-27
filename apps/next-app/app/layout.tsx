import type { Metadata, Viewport } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/i18n';
import { SupabaseProvider } from '@/lib/supabase/context';
import '../global.css';

// const _geist = Geist({ subsets: ['latin'] })
// const _geistMono = Geist_Mono({ subsets: ['latin'] })
// if (process.env.NEXT_RUNTIME === 'nodejs') {
//   const { server } = await import('@/mocks/node');
//   server.listen({});
// }
//
export const metadata: Metadata = {
  title: 'IssueTrack - Modern Issue Tracker',
  description:
    'A modern, professional issue tracking application inspired by Linear and Plane',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d14' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
