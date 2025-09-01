import {APP_NAME_UNDERSCORED, richTextQuery} from '@enonic/nextjs-adapter';

const getCampaign = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Campaign {
        data {
        teaser
          ${richTextQuery('bio')}
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getCampaign;