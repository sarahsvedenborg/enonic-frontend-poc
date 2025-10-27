import { Header, Footer, Banner } from 'ui-lib'
import { client } from '../../lib/sanity'
import { getMainMenuQuery } from '../../lib/queries'
import { MainMenu } from '../../lib/sanity'
import { Providers } from './providers'
/* import { Inter } from 'next/font/google' */
import '../../globals.css'
import { FrontendHeader } from '../../components/FrontendHeader'

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

async function getFooterMenu(): Promise<MainMenu | null> {
    try {
        const menu = await client.fetch(getMainMenuQuery, {
            location: 'footer',
            language: 'no'
        })
        return menu
    } catch (error) {
        console.error('Error fetching footer menu:', error)
        return null
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [headerMenu, footerMenu] = await Promise.all([
        getHeaderMenu(),
        getFooterMenu()
    ])

    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="layout-container">
                        <Banner site="Sanity CMS" login="https://rk-poc.sanity.studio/studio/structure" />
                        <FrontendHeader menuData={headerMenu} />
                        <main className="main-content">
                            {children}
                        </main>
                        <Footer menuData={footerMenu} />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
