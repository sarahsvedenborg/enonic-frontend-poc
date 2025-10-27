import { RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter';
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client';
import { fetchContent } from '@enonic/nextjs-adapter/server';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import { ReactNode } from 'react';

import '../../../styles/globals.css';

import { PageProps } from './page';
import { Popup } from '../../../posthogPopup/Popup';
import { Footer, Header } from 'ui-lib';
// TODO defines this type here as well
import type { MainMenu, MenuItem, SubMenuItem } from '../../../types/MenuType';

type LayoutProps = {
    params: PageProps
    children: ReactNode
}


type EnonicSubMenuItem = SubMenuItem & {
    content: {
        _path: string
    }
    url: string,
    itemtext: string
}
export default async function PageLayout({ params, children }: LayoutProps) {

    const { meta, common } = await fetchContent(params);

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





    // Extract menu from site x-data
    /*   const siteXData = common?.guillotine?.getSite?.xAsJson || {};
      const xpMenu = siteXData?.menu; */

    const siteXData = common?.getSite?.xAsJson
    const xpMenu = siteXData?.['tutorial-nxp']?.menu
    // const xpFooter = siteXData?.['tutorial-nxp']?.footer



    const xData = common?.getSite?.x?.['tutorial_nxp']?.menu
    const xpFooter = common?.getSite?.x?.['tutorial_nxp']?.footer



    const convertMenuItems = (items: any[]) => {



        if (!items) {
            return []
        }



        const newItems = items.map((item: any) => ({
            label: item.itemtext,
            menuType: item.menuitems ? 'dropdown' : 'external',
            subItems: Array.isArray(item?.menuitems) ? item.menuitems.map((subitem: EnonicSubMenuItem) => ({
                _type: "subMenuItem",
                /*        internalPage: subitem.content?._path, */
                internalPage: `/${subitem.content?._path.split('/').slice(2).join('/')}`,
                label: subitem.itemtext,
                subMenuType: subitem.url ? 'external' : 'internal',
                url: subitem.url
            })) : []
        }))

        return newItems
    }

    const hardcodedMenu = [
        {
            _key: "hardcoded-menu",
            label: "Hardkodet meny (Lenker virker)",
            menuType: 'dropdown',
            subItems: [
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
        }]



    // Map XP menu structure to MainMenu format
    function mapXpMenuToMainMenu(xpMenu: any): MainMenu | null {
        if (!xpMenu || !xpMenu.menuitems) return {
            _id: 'xp-main-menu',
            _type: 'mainMenu',
            title: 'Hovedmeny',
            menuItems: hardcodedMenu as any,
            menuItemsSecondary: [],
            menuItemsTertiary: [],
            menuLocation: 'header',
            language: 'no'
        };;

        return {
            _id: 'xp-main-menu',
            _type: 'mainMenu',
            title: 'Hovedmeny',
            menuItems: convertMenuItems(xpMenu.menuitems) as MenuItem[],
            // menuItemsSecondary: convertMenuItems(xpMenu.menuitemsLevel2) as MenuItem[],
            menuItemsSecondary: hardcodedMenu as any,
            menuItemsTertiary: convertMenuItems(xpMenu.menuitemsLevel2) as MenuItem[],
            menuLocation: 'header',
            language: 'no'
        };
    }

    const footerMenu = {
        _id: "footer-menu",
        menuItems: Array.isArray(xpFooter?.menuitems) ? xpFooter?.menuitems?.map((item: any) => ({
            label: item.itemtext,
            menuType: item.menuitems ? 'dropdown' : 'external',
            subItems: item.menuitems ? item.menuitems?.map((subitem: any) => ({
                _type: "subMenuItem",
                internalPage: `/${subitem.content?._path.split('/').slice(2).join('/')}`,
                label: subitem.itemtext,
                subMenuType: subitem.url ? 'external' : 'internal',
                url: subitem.url
            })) : []
        })) : []
    }

    /*    const footerMenu = {
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
    */
    return (
        <LocaleContextProvider locale={params.locale} >
            <StaticContent condition={isEdit}>
                <Header frontend="enonic" menuData={mapXpMenuToMainMenu(xData) || null} />
                <main>{children}</main>
                <Popup />
                <Footer menuData={footerMenu as any} />
            </StaticContent>
        </LocaleContextProvider >
    )
}
