import { StructureBuilder } from "sanity/desk"
import { FiFileText, FiGift, FiGlobe, FiSmile, FiCalendar } from 'react-icons/fi'

export const nationalContributorContent = (S: StructureBuilder) => {
    const structure = ({ locale }: { locale: string }) => (
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
                                    .filter('_type == "argument" && language == $locale')
                                    .params({
                                        locale: locale
                                    })
                            ),

                    ])
            ),
    )

    return [structure({ locale: 'no' }), structure({ locale: 'en' })]
}