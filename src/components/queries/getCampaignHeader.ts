import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getCampaignHeader = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getCampaignHeader;