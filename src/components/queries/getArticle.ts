import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getArticle = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Article {
        data {
        preface
        
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getArticle;