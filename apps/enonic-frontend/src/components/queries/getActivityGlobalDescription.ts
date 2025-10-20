import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getActivityGlobalDescription = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_ActivityLocal {
        data {
          global_activity_name
          ${richTextQuery('body')}
         photo {
           ... on media_Image {
              imageUrl: imageUrl(type: absolute, scale: "width(2000)")
              attachments {
                name
              }
            }
          }
        }
      }
    }
    query(
      contentTypes: ["${APP_NAME_UNDERSCORED}_Activity"]
      first: 1
    ) {
      ... on ${APP_NAME_UNDERSCORED}_Activity {
        displayName
        data {
          shortDescription
          ${richTextQuery('body')}
        }
      }
    }
  }
}`;

export default getActivityGlobalDescription;
