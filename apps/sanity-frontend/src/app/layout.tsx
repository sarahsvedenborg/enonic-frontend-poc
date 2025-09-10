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
            description: '(Innhold i sanity, noen elementer hardkodet i frontend, noe kan styres av redaktører)'
        },
        {
            title: 'Kampanjer',
            href: '/kampanjer',
            description: '(Innhold i sanity og mulighet for redaktører å tilpasse siden med andre elementer)'
        },
        {
            title: 'Aktuelt',
            href: '/aktuelt',
            description: '(Listeside for alle aktueltsaker)'
        },
        {
            title: 'Lokalforenring',
            href: '/lokalforeninger',
            description: '(Listeside for lokalforeninger)'
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
