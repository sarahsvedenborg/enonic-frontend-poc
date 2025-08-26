import { RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter';
import { LocaleContextProvider } from '@enonic/nextjs-adapter/client';
import { fetchContent } from '@enonic/nextjs-adapter/server';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import { ReactNode } from 'react';

import '../../../styles/globals.css';

import { PageProps } from './page';
import SiteFooter from '../../../components/views/SiteFooter';
import { SiteHeader } from '../../../components/views/SiteHeader';
import { Popup } from '../../../posthogPopup/Popup';

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

    return (
        <LocaleContextProvider locale={params.locale}>
            <StaticContent condition={isEdit}>
                <SiteHeader />
                <main>{children}</main>
                <Popup />
                <SiteFooter />
            </StaticContent>
        </LocaleContextProvider>
    )
}
