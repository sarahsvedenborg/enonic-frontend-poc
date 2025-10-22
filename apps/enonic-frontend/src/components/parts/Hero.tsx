import React from 'react'
import { APP_NAME, PartData } from '@enonic/nextjs-adapter';
import { Heading, Section, Hero } from 'ui-lib';
import { Paragraph } from '@digdir/designsystemet-react';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface HeroPartData {
    part: PartData;
    common: any;
}


const HeroPart = ({ part, common }: HeroPartData) => {
    console.log("part", part);
    const headerPhotoUrl = part?.config?.imageUrl



    return <Section width="md">
        <Hero title={part?.config?.heading || common?.get?.displayName} description={part?.config?.text} imageURL={undefined} />
        {/*  <Heading level={2}>{part?.config?.heading || common?.get?.displayName}</Heading>
        <Paragraph>{part?.config?.text}</Paragraph> */}
    </Section>
};

export default HeroPart;