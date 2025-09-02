import { StructureBuilder } from 'sanity/desk'
import { FiFileText, FiGift, FiGlobe, FiMapPin } from 'react-icons/fi'

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title('Innhold')
        .items([
            // Norwegian content
            S.listItem()
                .title('Norsk')
                .icon(FiGlobe)
                .child(
                    S.list()
                        .title('Norsk')
                        .items([
                            S.listItem()
                                .title('Artikler')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('Artikler')

                                        .filter('_type == "article" && language == "no"')
                                ),
                            S.listItem()
                                .title('Kampanjer')
                                .icon(FiGift)
                                .child(
                                    S.documentList()
                                        .title('Kampanjer')
                                        .filter('_type == "campaign" && language == "no"')
                                ),
                            S.listItem()
                                .title('Lokalforeninger')
                                .icon(FiMapPin)
                                .child(
                                    S.documentList()
                                        .title('Lokalforeninger')
                                        .filter('_type == "localGroup" && language == "no"')
                                ),
                        ])
                ),

            // English Content
            S.listItem()
                .title('Engelsk')
                .icon(FiGlobe)
                .child(
                    S.list()
                        .title('Engelsk')
                        .items([
                            S.listItem()
                                .title('Articles')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('Articles')
                                        .filter('_type == "article" && language == "en"')
                                ),
                            S.listItem()
                                .title('Campaigns')
                                .icon(FiGift)
                                .child(
                                    S.documentList()
                                        .title('Campaigns')
                                        .filter('_type == "campaign" && language == "en"')
                                ),
                            S.listItem()
                                .title('Branches')
                                .icon(FiMapPin)
                                .child(
                                    S.documentList()
                                        .title('Branches')
                                        .filter('_type == "localGroup" && language == "en"')
                                ),
                        ])
                ),



            /*    // All Content (for overview)
               S.listItem()
                   .title('All Content')
                   .child(
                       S.list()
                           .title('All Content')
                           .items([
                               S.listItem()
                                   .title('All Articles')
                                   .child(
                                       S.documentList()
                                           .title('All Articles')
                                           .filter('_type == "article"')
                                   ),
                               S.listItem()
                                   .title('All Campaigns')
                                   .child(
                                       S.documentList()
                                           .title('All Campaigns')
                                           .filter('_type == "campaign"')
                                   ),
                               S.listItem()
                                   .title('All Local Groups')
                                   .child(
                                       S.documentList()
                                           .title('All Local Groups')
                                           .filter('_type == "localGroup"')
                                   ),
                           ])
                   ),
    */
            // All other document types
            ...S.documentTypeListItems().filter(
                (listItem) => !['article', 'campaign', 'localGroup'].includes(listItem.getId() as string)
            ),
        ])
