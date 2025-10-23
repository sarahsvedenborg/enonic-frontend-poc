import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getCampaignBody = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Campaign {
        data {
          ${richTextQuery('body')}
                arguments{
            ... on tutorial_nxp_Argument{
              data {
          title
          text
         linkText
           image {
           ... on media_Image {
              imageUrl: imageUrl(type: absolute, scale: "width(2000)")
              attachments {
                name
              }
            }
          }
              readMoreLink {
           _name,
           _path
           pageUrl
          }
            image {
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
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getCampaignBody;