import {APP_NAME_UNDERSCORED, richTextQuery} from '@enonic/nextjs-adapter';

const getCampaign = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Donate {
        data {
        teaser
          ${richTextQuery('bio')}
          info{
          _name
          _path
          }
          otherWays{
          _name
          _path
          }
   
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getCampaign;