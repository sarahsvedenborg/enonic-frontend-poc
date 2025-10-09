import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getInfoArticle = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_InfoArticle {
      data {
          shortDescription
          ${richTextQuery('body')}
        }
      }
    }
  }
}`;

export default getInfoArticle;