import { Header, Banner } from 'ui-lib'
/* import { Inter } from 'next/font/google' */
import '../../globals.css'

/* const inter = Inter({ subsets: ['latin'] }) */

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body >
                <div >
                    <Banner site="Sanity CMS" login="https://rk-poc.sanity.studio/studio/structure" />
                    <Header />
                    <main >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
