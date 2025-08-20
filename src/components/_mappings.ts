import { CATCH_ALL, ComponentRegistry } from '@enonic/nextjs-adapter';
import PropsView from '@enonic/nextjs-adapter/views/PropsView';
import { commonQuery, commonVariables } from './queries/common';
import ChildList, { childListProcessor, getChildList } from './parts/ChildList';

import "@enonic/nextjs-adapter/baseMappings";
import { APP_NAME } from '@enonic/nextjs-adapter';
import getCampaign from './queries/getCampaign';
import Campaign from './views/Campaign';
import getDonatePage from './queries/getDonatePage';
import DonatePage from './views/DonatePage';
import MainPage from './pages/Main';
import DonatePagePage from './pages/DonatePage';
import Heading from './parts/Heading';
import MoneyArrives from './parts/MoneyArrives';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import MovieDetails, { getMovie } from './parts/MovieDetails';

import { DonationView } from './views/DonationView';
import LocalHome from './views/LocalHome';
import getLocalHome from './queries/getLocalHome';
// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:campaign`, {
  query: getCampaign,
  view: Campaign
});

ComponentRegistry.addContentType(`${APP_NAME}:donate`, {
  query: getDonatePage,
  view: DonatePage
});

ComponentRegistry.addContentType(`${APP_NAME}:localHome`, {
  query: getLocalHome,
  view: LocalHome
});



// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
  view: MainPage
});


/* ComponentRegistry.addPage(`${APP_NAME}:donate`, {
  view: DonatePagePage
}); */



// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
  view: TwoColumnLayout
});



// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
  query: getChildList,
  processor: childListProcessor,
  view: ChildList
});

ComponentRegistry.addPart(`${APP_NAME}:heading`, {
  view: Heading
});

ComponentRegistry.addPart(`${APP_NAME}:money-arrives`, {
  view: MoneyArrives
});

ComponentRegistry.addPart(`${APP_NAME}:donation-form`, {
  view: DonationView
});


ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
  query: getMovie,
  view: MovieDetails
});



// Debug
/* ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
}); */
