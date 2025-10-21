import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getLocalActivity = () => `
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
    contentTypes: ["tutorial.nxp:activity"] ){
    _id
    displayName
    ...on tutorial_nxp_Activity{
      data{
        signupForm{
        title
        intro
        information
        }
        activityType
        shortDescription
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
  }
}`;

export default getLocalActivity;
