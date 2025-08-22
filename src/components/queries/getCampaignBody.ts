import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getCampaignBody = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Campaign {
        data {
          ${richTextQuery('body')}
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getCampaignBody;