import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getNewsArticle = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_NewsArticle {
      data {
          shortDescription
          ${richTextQuery('body')}
        }
      }
    }
  }
}`;

export default getNewsArticle;