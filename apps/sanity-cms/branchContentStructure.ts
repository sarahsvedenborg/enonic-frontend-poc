import { FiCalendar, FiFileText, FiGift, FiGlobe, FiMapPin, FiSmile } from "react-icons/fi"
import { StructureBuilder } from "sanity/desk"

export const branchContentStructure = (S: StructureBuilder, { branchId }: { branchId: string }) => {

    const structure = ({ locale }: { locale: string }) => (

        S.listItem()
            .title(locale === 'no' ? 'Norsk' : 'Engelsk')
            .icon(FiGlobe)
            .child(
                S.list()
                    .title(locale === 'no' ? 'Norsk' : 'Engelsk')
                    .items([
                        S.divider().title('Sider'),
                        S.listItem()
                            .title('Lokalforeninger')
                            .icon(FiMapPin)
                            .child(
                                S.documentTypeList('localGroup')
                                    .title('Lokalforeninger')
                                    .filter('_type == "localGroup" && language == $locale  && branchId == $branchId')
                                    .params({
                                        branchId, locale
                                    })
                                    .child((branchId: string) =>
                                        S.list()
                                            .title("Innhold per lokalforening")
                                            .items([
                                                S.listItem()
                                                    .title('Landingsside')
                                                    .icon(FiMapPin)
                                                    .child(
                                                        S.document()
                                                            .documentId(branchId)
                                                            .schemaType('localGroup')

                                                    ),
                                                S.divider(),
                                                S.listItem()
                                                    .title('Arrangementer')
                                                    .icon(FiCalendar)
                                                    .child(
                                                        S.documentList()
                                                            .title('Arrangementer som tilhører lokalforeningen')
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
                                                            .title('Nyheter som tilhører lokalforeningen')
                                                            .filter('_type == "newsArticle" && branchId._ref == $branchId && language == "no"')
                                                            .params({
                                                                branchId: branchId
                                                            })
                                                    )

                                            ])
                                    )

                            ),

                        /*  S.listItem()
                             .title('Arrangementer')
                             .icon(FiCalendar)
                             .child(
                                 S.documentList()
                                     .title('Arrangementer')
                                     .filter('_type == "event" && language == "no"')
                             ), */
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
            )
    )
    return [structure({ locale: 'no' }), structure({ locale: 'en' })]
}