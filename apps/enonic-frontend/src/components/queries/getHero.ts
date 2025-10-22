import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

export const getHero = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      components{
        part{
          descriptor
          config{
            tutorial_nxp{
              heading{
                heading
                text
                image{
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
      
      }
    }
  }
}`;
/*     ... on ${APP_NAME_UNDERSCORED}_Campaign {
      data {
        photos {
         ... on media_Image {
            imageUrl: imageUrl(type: absolute, scale: "width(2000)")
            attachments {
              name
            }
          }
        }
      }
    } */

export default getHero;