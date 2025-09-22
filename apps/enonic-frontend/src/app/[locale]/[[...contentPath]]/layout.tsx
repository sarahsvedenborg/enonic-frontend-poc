import { RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter';
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client';
import { fetchContent } from '@enonic/nextjs-adapter/server';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import { ReactNode } from 'react';

import '../../../styles/globals.css';

import { PageProps } from './page';
import { Popup } from '../../../posthogPopup/Popup';
import { Footer, Header } from 'ui-lib';

type LayoutProps = {
    params: PageProps
    children: ReactNode
}

export default async function PageLayout({ params, children }: LayoutProps) {

    const { meta } = await fetchContent(params);

    const isEdit = meta?.renderMode === RENDER_MODE.EDIT;

    // Component rendering - for component updates in Content Studio without reloading page
    if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
        // don't wrap it in direct next access because we want to show 1 component on the page
        const content: ReactNode =
            meta.renderMode === RENDER_MODE.NEXT ?
                children :
                <details data-single-component-output="true">{children}</details>

        return (
            <LocaleContextProvider locale={params.locale}>
                <StaticContent condition={isEdit}>{content}</StaticContent>
            </LocaleContextProvider>
        );
    }

    const headerMenu = {
        _id: 'asda',
        menuItems: [{
            label: "I PoC-en", menuType: 'dropdown', subItems: [
                {
                    _type: "subMenuItem", internalPage: '/stott-arbeidet',
                    label: 'Fast giverside',
                    subMenuType: 'internal'

                },
                {
                    _type: "subMenuItem", internalPage: '/kampanjer',
                    label: 'Kampanjer',
                    subMenuType: 'internal'
                },
                {
                    _type: "subMenuItem", internalPage: '/aktuelt',
                    label: 'Aktuelt',
                    subMenuType: 'internal'
                },
                {
                    _type: "subMenuItem", internalPage: '/lokalforeninger',
                    label: 'Lokalforening',
                    subMenuType: 'internal'
                }]
        }],
        menuItemsSecondary: [],
        menuItemsTertiary: [],
        menuLocation: 'header',
        title: 'Main Menu',
        _type: 'mainMenu'
    }

    const footerMenu = {
        _id: 'asda',
        menuItems: [{
            label: "Kontakt oss", menuType: 'dropdown', subItems: [
                {
                    _type: "subMenuItem", internalPage: '/stott-arbeidet',
                    label: 'Kundeservice',
                    subMenuType: 'external',
                    url: 'https://www.rodekors.no/',

                },
                {
                    _type: "subMenuItem", internalPage: '/lokalforeninger',
                    label: 'Finn din lokalforening',
                    subMenuType: 'internal'
                },
            ]
        },
        {
            label: "Jobb i Røde Kors", menuType: 'dropdown', subItems: [
                {
                    _type: "subMenuItem",
                    url: 'https://www.rodekors.no/',
                    label: 'Nasjonalt',
                    subMenuType: 'external'

                },
                {
                    _type: "subMenuItem",
                    url: 'https://www.rodekors.no/',
                    label: 'Internasjonalt',
                    subMenuType: 'external'
                },
            ]
        },
        {
            label: "Presserom", menuType: 'external', url: 'https://www.rodekors.no/'


        }],
        menuItemsSecondary: [],
        menuItemsTertiary: [],
        menuLocation: 'footer',
        title: 'Footer Menu',
        _type: 'mainMenu'
    }

    return (
        <LocaleContextProvider locale={params.locale}>
            <StaticContent condition={isEdit}>
                <Header menuData={headerMenu as any} />
                <main>{children}</main>
                <Popup />
                <Footer menuData={footerMenu as any} />
            </StaticContent>
        </LocaleContextProvider>
    )
}
