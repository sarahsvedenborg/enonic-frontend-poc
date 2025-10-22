import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getCampaignHeader = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
        ... on ${APP_NAME_UNDERSCORED}_Campaign {
        data {
          photos {
           ... on media_Image {
              imageUrl: imageUrl(type: absolute, scale: "width(2000)")
              attachments {
                name
              }
            }
          }
             donationForm{
            ... on tutorial_nxp_Giverskjema{
              data {
          
            heading
            description
            amount1
            amount2
            amount3
            fact
         
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

export default getCampaignHeader;