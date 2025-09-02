import type { Metadata } from 'next'
/* import { Inter } from 'next/font/google' */
import './globals.css'

/* const inter = Inter({ subsets: ['latin'] }) */

export const metadata: Metadata = {
    title: 'Sanity Frontend',
    description: 'A simple frontend for Sanity CMS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body >
                <div >
                    <header >
                        header
                    </header>
                    <main >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
