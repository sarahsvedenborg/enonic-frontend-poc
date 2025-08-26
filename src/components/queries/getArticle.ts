import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getArticle = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_CustomArticle {
      data {
          shortDescription
          ${richTextQuery('body')}
        }
      }
    }
  }
}`;

export default getArticle;