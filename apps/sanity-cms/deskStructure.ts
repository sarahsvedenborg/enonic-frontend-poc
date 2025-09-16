import { StructureBuilder } from 'sanity/desk'
import { FiFileText, FiGift, FiGlobe, FiMapPin, FiSmile, FiTarget, FiCalendar, FiMenu } from 'react-icons/fi'

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
                            S.divider().title('Sider'),
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

                            /*   S.listItem()
                                  .title('Lokalforeninger')
                                  .icon(FiMapPin)
                                  .child(
                                      S.documentList()
                                          .title('Lokalforeninger')
                                          .filter('_type == "localGroup" && language == "no"')
                                          .child((id) =>
                                              S.document()
                                                  .documentId(id)
                                                  .schemaType('localGroup')
                                                  .child(
                                                      S.list()
                                                          .title('Lokalforening innhold')
                                                          .items([
                                                              S.listItem()
                                                                  .title('Landingsside')
                                                                  .icon(FiMapPin)
                                                                  .child(
                                                                      S.document()
                                                                          .documentId(id)
                                                                          .schemaType('localGroup')
                                                                  ),
                                                              S.listItem()
                                                                  .title('Nyheter')
                                                                  .icon(FiFileText)
                                                                  .child(
                                                                      S.documentList()
                                                                          .title('Nyheter')
                                                                          .filter(`_type == "newsArticle" && language == "no" && branchId->branchId == "${id}"`)
                                                                  ),
                                                              S.listItem()
                                                                  .title('Arrangementer')
                                                                  .icon(FiCalendar)
                                                                  .child(
                                                                      S.documentList()
                                                                          .title('Arrangementer')
                                                                          .filter(`_type == "event" && language == "no" && localBranch._ref == "${id}"`)
                                                                  )
                                                          ])
                                                  )
                                          )
                                  ), */

                            S.listItem()
                                .title('Lokalforeninger')
                                .icon(FiMapPin)
                                .child(
                                    S.documentTypeList('localGroup')
                                        .title('Lokalforeninger')
                                        .filter('_type == "localGroup" && language == "no"')
                                        .child(branchId =>

                                            S.list()
                                                .title("Innhold per lokalforening")
                                                .items([
                                                    S.listItem()
                                                        .title('Landingsside')
                                                        .icon(FiMapPin)
                                                        .child(
                                                            S.document()
                                                                .title(`eventer som tilhører ${branchId}`)
                                                                .documentId(branchId)
                                                                .schemaType('localGroup')

                                                        ),
                                                    S.divider(),
                                                    S.listItem()
                                                        .title('Arrangementer')
                                                        .icon(FiCalendar)
                                                        .child(
                                                            S.documentList()
                                                                .title(`eventer som tilhører ${branchId}`)
                                                                .filter('_type == "event" && localBranch._ref == $branchId && language == "no"')
                                                                .params({
                                                                    branchId: branchId
                                                                })
                                                        ),
                                                    S.listItem()
                                                        .title('Nyhetsartikler')
                                                        .icon(FiFileText)
                                                        .child(
                                                            S.documentList()
                                                                .title(`nyheter som tilhører ${branchId}`)
                                                                .filter('_type == "newsArticle" && branchId._ref == $branchId && language == "no"')
                                                                .params({
                                                                    branchId: branchId
                                                                })
                                                        )

                                                ])
                                        )

                                ),
                            S.listItem()
                                .title('Aktiviteter')
                                .icon(FiTarget)
                                .child(
                                    S.documentList()
                                        .title('Aktiviteter')
                                        .filter('_type == "activity" && language == "no"')
                                ),
                            S.listItem()
                                .title('Arrangementer')
                                .icon(FiCalendar)
                                .child(
                                    S.documentList()
                                        .title('Arrangementer')
                                        .filter('_type == "event" && language == "no"')
                                ),
                            S.divider().title('Faste sider'),
                            S.listItem()
                                .title('Permanent giverside')
                                .icon(FiGift)
                                .child(
                                    S.document()
                                        .title('Permanent giverside')
                                        .documentId('permanent-campaign-no')
                                        .schemaType('permanentCampaign')
                                ),
                            S.divider().title('Navigasjon (meny, footer, forside)'),
                            S.listItem()
                                .title('Menyer')
                                .icon(FiMenu)
                                .child(
                                    S.documentList()
                                        .title('Menyer')
                                        .filter('_type == "mainMenu" && language == "no"')
                                ),
                            S.listItem()
                                .id('dsdf')
                                .title('Giverskjema')
                                .icon(FiGift)
                                .child(
                                    S.documentList()
                                        .title('Giverskjema')
                                        .filter('_type == "donationForm" && language == "no"')
                                ),
                            S.divider().title('Annet innhold'),
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
                                        .child((id) =>
                                            S.document()
                                                .documentId(id)
                                                .schemaType('localGroup')
                                                .child(
                                                    S.list()
                                                        .title('Branch Content')
                                                        .items([
                                                            S.listItem()
                                                                .title('Landing Page')
                                                                .icon(FiMapPin)
                                                                .child(
                                                                    S.document()
                                                                        .documentId(id)
                                                                        .schemaType('localGroup')
                                                                ),
                                                            S.listItem()
                                                                .title('News')
                                                                .icon(FiFileText)
                                                                .child(
                                                                    S.documentList()
                                                                        .title('News')
                                                                        .filter(`_type == "newsArticle" && language == "en" && branchId->branchId == "${id}"`)
                                                                ),
                                                            S.listItem()
                                                                .title('Events')
                                                                .icon(FiCalendar)
                                                                .child(
                                                                    S.documentList()
                                                                        .title('Events')
                                                                        .filter(`_type == "event" && language == "en" && localBranch._ref == "${id}"`)
                                                                )
                                                        ])
                                                )
                                        )
                                ),
                            S.listItem()
                                .title('Activities')
                                .icon(FiTarget)
                                .child(
                                    S.documentList()
                                        .title('Activities')
                                        .filter('_type == "activity" && language == "en"')
                                ),
                            S.listItem()
                                .title('Events')
                                .icon(FiCalendar)
                                .child(
                                    S.documentList()
                                        .title('Events')
                                        .filter('_type == "event" && language == "en"')
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Menus')
                                .icon(FiMenu)
                                .child(
                                    S.documentList()
                                        .title('Menus')
                                        .filter('_type == "mainMenu" && language == "en"')
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
                (listItem) => !['article', 'newsArticle', 'campaign', 'permanentCampaign', 'localGroup', 'donationForm', 'argument', 'activity', 'event', 'mainMenu'].includes(listItem.getId() as string)
            ),
        ])
