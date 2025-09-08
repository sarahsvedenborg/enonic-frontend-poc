import { Header, Banner } from 'ui-lib'
/* import { Inter } from 'next/font/google' */
import '../../globals.css'

/* const inter = Inter({ subsets: ['latin'] }) */

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const menuItems = [
        {
            title: 'Gi støtte - Fast giverside',
            href: '/stott-arbeidet',
            description: '(Innhold i sanity, hardkodet design i frontend)'
        },
        {
            title: 'Kampanjer',
            href: '/kampanjer',
            description: '(Innhold i enonic og mulighet for redaktører å tilpasse siden med andre elementer)'
        },
        {
            title: 'Aktuelt',
            href: '/aktuelt',
            description: '(Listeside for alle aktueltsaker)'
        },
        {
            title: 'Lokalforenring',
            href: '/lokallag/rode-kors-ullensaker',
            description: '(work in progress)'
        }
    ]
    return (
        <html lang="en">
            <body >
                <div >
                    <Banner site="Sanity CMS" login="https://rk-poc.sanity.studio/studio/structure" />
                    <Header menuItems={menuItems} />
                    <main >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
