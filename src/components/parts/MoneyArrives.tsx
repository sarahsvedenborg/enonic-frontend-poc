import React from 'react'
import {APP_NAME, PartData} from '@enonic/nextjs-adapter';
import MoneyArrivesComponent from '../../ui/Complex/MoneyArrives/MoneyArrives';
import { Heading, Link as Link2  } from '@digdir/designsystemet-react';

// fully qualified XP part name:
export const MONEY_ARRIVES_PART_NAME = `${APP_NAME}:money-arrives`;

export interface MoneyArrivesData {
    part: PartData;
    common: any;
}

const MoneyArrivesView = ({part, common}: MoneyArrivesData) => {

             return(
              
              <MoneyArrivesComponent 
              title = {part?.config?.heading || common?.get?.displayName}
              description = {part?.config?.description || "Description"}
              percentage = {part?.config?.causeAmount || 90}
              learnMoreText = {part?.config?.readMoreLabel || "Les mer"}
              learnMoreUrl = {part?.config?.readMoreUrl || "#"}
              />   ) 

};

export default MoneyArrivesView;