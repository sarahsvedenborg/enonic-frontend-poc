import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getLokalforening = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Lokalforening {
        data {
         sourceId
         api_activities
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getLokalforening;