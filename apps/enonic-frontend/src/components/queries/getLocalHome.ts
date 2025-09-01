import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getLocalHome = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_LocalHome {
        data {
          shortDescription
          ${richTextQuery('bio')}
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getLocalHome;