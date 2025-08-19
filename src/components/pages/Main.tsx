import type {PageProps} from '@enonic/nextjs-adapter';
import React from 'react'
import RegionsView from '@enonic/nextjs-adapter/views/Region';
import { Card } from 'rk-designsystem';
import { HomePageLinks } from '../../ui/HomePageLinks/HomePageLinks';

const MainPage = (props: PageProps) => {
    const page = props.page;
    if (!page.regions || !Object.keys(page.regions).length) {
        page.regions = {
            main: {
                name: 'main',
                components: [],
            }
        }
    }
    return (
        <>
            <RegionsView {...props} name="main"/>
<HomePageLinks />
        </>
    );
};

export default MainPage;