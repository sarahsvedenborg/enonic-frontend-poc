import { Header, Banner } from 'ui-lib'
import { client } from '../../lib/sanity'
import { getMainMenuQuery } from '../../lib/queries'
import { MainMenu } from '../../lib/sanity'
/* import { Inter } from 'next/font/google' */
import '../../globals.css'

/* const inter = Inter({ subsets: ['latin'] }) */

async function getHeaderMenu(): Promise<MainMenu | null> {
    try {
        const menu = await client.fetch(getMainMenuQuery, {
            location: 'header',
            language: 'no'
        })
        return menu
    } catch (error) {
        console.error('Error fetching header menu:', error)
        return null
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headerMenu = await getHeaderMenu()

    return (
        <html lang="en">
            <body >
                <div >
                    <Banner site="Sanity CMS" login="https://rk-poc.sanity.studio/studio/structure" />
                    <Header menuData={headerMenu} />
                    <main >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}
