import { StructureBuilder } from 'sanity/desk'
import { FiFileText, FiGift, FiGlobe, FiMapPin, FiSmile, FiTarget } from 'react-icons/fi'

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
                            S.divider(),
                            S.listItem()
                                .title('Informasjonssider')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('Artikler')

                                        .filter('_type == "article" && language == "no"')
                                ),
                            S.listItem()
                                .title('Nyhetsartikler')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('Nyhetsartikler')
                                        .filter('_type == "newsArticle" && language == "no"')
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
                            S.divider(),
                            S.listItem()
                                .title('Permanent giverside')
                                .icon(FiGift)
                                .child(
                                    S.document()
                                        .title('Permanent giverside')
                                        .documentId('permanent-campaign-no')
                                        .schemaType('permanentCampaign')
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Giverskjema')
                                .icon(FiGift)
                                .child(
                                    S.documentList()
                                        .title('Giverskjema')
                                        .filter('_type == "donationForm" && language == "no"')
                                ),
                            S.listItem()
                                .title('Argumenter')
                                .icon(FiSmile)
                                .child(
                                    S.documentList()
                                        .title('Argumenter')
                                        .filter('_type == "argument" && language == "no"')
                                ),
                            S.listItem()
                                .title('Aktiviteter')
                                .icon(FiTarget)
                                .child(
                                    S.documentList()
                                        .title('Aktiviteter')
                                        .filter('_type == "activity" && language == "no"')
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
                                .title('News Articles')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('News Articles')
                                        .filter('_type == "newsArticle" && language == "en"')
                                ),
                            S.listItem()
                                .title('Arguments')
                                .icon(FiFileText)
                                .child(
                                    S.documentList()
                                        .title('Arguments')
                                        .filter('_type == "arguments" && language == "en"')
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
                                .title('Permanent Campaign')
                                .icon(FiGift)
                                .child(
                                    S.document()
                                        .title('Permanent Campaign')
                                        .documentId('permanent-campaign-en')
                                        .schemaType('permanentCampaign')
                                ),
                            S.listItem()
                                .title('Branches')
                                .icon(FiMapPin)
                                .child(
                                    S.documentList()
                                        .title('Branches')
                                        .filter('_type == "localGroup" && language == "en"')
                                ),
                            S.listItem()
                                .title('Activities')
                                .icon(FiTarget)
                                .child(
                                    S.documentList()
                                        .title('Activities')
                                        .filter('_type == "activity" && language == "en"')
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
                (listItem) => !['article', 'newsArticle', 'campaign', 'permanentCampaign', 'localGroup', 'donationForm', 'argument', 'activity'].includes(listItem.getId() as string)
            ),
        ])
