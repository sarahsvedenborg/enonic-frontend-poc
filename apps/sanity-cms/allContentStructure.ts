import { FiGlobe, FiFileText, FiGift, FiMapPin, FiCalendar, FiTarget, FiMenu, FiSmile } from "react-icons/fi"
import { StructureBuilder } from "sanity/desk"

export const allContentStructure = (S: StructureBuilder) => {
    const structure = ({ locale }: { locale: string }) =>
        // Norwegian content
        S.listItem()
            .title(locale === 'no' ? 'Norsk' : 'Engelsk')
            .icon(FiGlobe)
            .child(
                S.list()
                    .title(locale === 'no' ? 'Norsk' : 'Engelsk')
                    .items([
                        S.divider().title('Sider'),
                        S.listItem()
                            .title('Informasjonssider')
                            .icon(FiFileText)
                            .child(
                                S.documentList()
                                    .title('Artikler')

                                    .filter('_type == "article" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                        S.listItem()
                            .title('Nyhetsartikler')
                            .icon(FiFileText)
                            .child(
                                S.documentList()
                                    .title('Nyhetsartikler')
                                    .filter('_type == "newsArticle" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                        S.listItem()
                            .title('Kampanjer')
                            .icon(FiGift)
                            .child(
                                S.documentList()
                                    .title('Kampanjer')
                                    .filter('_type == "campaign" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),

                        S.listItem()
                            .title('Lokalforeninger')
                            .icon(FiMapPin)
                            .child(
                                S.documentTypeList('localGroup')
                                    .title('Lokalforeninger')
                                    .filter('_type == "localGroup" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                                    .child(branchId =>

                                        S.list()
                                            .title("Innhold per lokalforening")
                                            .items([
                                                S.listItem()
                                                    .title('Landingsside')
                                                    .icon(FiMapPin)
                                                    .child(
                                                        S.document()
                                                            /*      .title(`eventer som tilhører ${branchId}`) */
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
                            .title('Globale aktivitetsbeskrivelser')
                            .icon(FiTarget)
                            .child(
                                S.documentList()
                                    .title('Aktiviteter')
                                    .filter('_type == "activity" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                        S.listItem()
                            .title('Arrangementer')
                            .icon(FiCalendar)
                            .child(
                                S.documentList()
                                    .title('Arrangementer')
                                    .filter('_type == "event" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
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
                                    .filter('_type == "mainMenu" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                        S.divider().title('Annet innhold'),
                        S.listItem()
                            .title('Giverskjema')
                            .icon(FiGift)
                            .child(
                                S.documentList()
                                    .title('Giverskjema')
                                    .filter('_type == "donationForm" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                        S.listItem()
                            .title('Argumenter')
                            .icon(FiSmile)
                            .child(
                                S.documentList()
                                    .title('Argumenter')
                                    .filter('_type == "argument" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),
                    ])
            )

    const rest = [...S.documentTypeListItems().filter(
        (listItem) => !['article', 'newsArticle', 'campaign', 'permanentCampaign', 'localGroup', 'donationForm', 'argument', 'activity', 'event', 'mainMenu'].includes(listItem.getId() as string)
    )]



    return [structure({ locale: 'no' }), structure({ locale: 'en' }), ...rest]

}