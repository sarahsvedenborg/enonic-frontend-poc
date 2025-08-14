import {CATCH_ALL, ComponentRegistry} from '@enonic/nextjs-adapter';
import PropsView from '@enonic/nextjs-adapter/views/PropsView';
import {commonQuery, commonVariables} from './queries/common';

import "@enonic/nextjs-adapter/baseMappings";
import {APP_NAME} from '@enonic/nextjs-adapter';
import getCampaign from './queries/getCampaign';
import Campaign from './views/Campaign';
// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:campaign`, {
  query: getCampaign,
    view: Campaign
}); 



// Page mappings



// Layout mappings



// Part mappings



// Debug
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
