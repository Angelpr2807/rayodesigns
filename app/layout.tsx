import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const spaceGrotesk = localFont({
  src: '../public/fonts/SpaceGrotesk-VariableFont_wght.ttf',
  variable: '--font-space',
  display: 'swap',
})

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'DesignHub'
const platformDescription = process.env.NEXT_PUBLIC_PLATFORM_DESCRIPTION || 'La mejor plataforma para aprender diseño gráfico y desarrollar tus habilidades creativas'

export const metadata: Metadata = {
  title: `${platformName} - Aprende Diseño Gráfico`,
  description: platformDescription,
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main className="md:pt-16">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
