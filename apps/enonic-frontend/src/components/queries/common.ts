// This query is executed for every page rendering.
// Result is included in props.common

export const commonQuery = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      _id
      type
      dataAsJson
      xAsJson
    }
    getSite {
      displayName
      _path
      xAsJson
      x{
        tutorial_nxp{
          menu{
            menuitems{
              itemtext
              url
            __typename
                ...on XData_tutorial_nxp_menu_DataConfig_Menuitems{
                  content {
                   pageUrl
                  } 
              }
              menuitems {
                itemtext
                url
                ...on XData_tutorial_nxp_menu_DataConfig_Menuitems_2{
                  content {
                   _path
                  }
                }
              }
            }
          }
             footer{
            menuitems{
              itemtext
              url
              ... on XData_tutorial_nxp_footer_DataConfig_Menuitems {
                content {
                  pageUrl
                }
              }
              menuitems{
                itemtext
                url... on XData_tutorial_nxp_footer_DataConfig_Menuitems_2{
                  content{
                    _path
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

export function commonVariables(path: string) {
  return {
    path
  }
}