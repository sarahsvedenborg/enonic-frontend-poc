import { APP_NAME_UNDERSCORED, richTextQuery } from '@enonic/nextjs-adapter';

const getCampaign = () => `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Donate {
        data {
        photos {
           ... on media_Image {
              imageUrl: imageUrl(type: absolute, scale: "width(2000)")
              attachments {
                name
              }
            }
          }
          ${richTextQuery('bio')}
          info{
          _name
          _path
          }
          otherWays{
          _name
          _path
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

export default getCampaign;