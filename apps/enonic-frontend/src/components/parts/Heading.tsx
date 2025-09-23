import React from 'react'
import { APP_NAME, PartData } from '@enonic/nextjs-adapter';
import { Heading, Section } from 'ui-lib';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface HeadingData {
    part: PartData;
    common: any;
}


const HeadingView = ({ part, common }: HeadingData) => {
    return <Section width="md"><Heading level={2}>{part?.config?.heading || common?.get?.displayName}</Heading></Section>
};

export default HeadingView;