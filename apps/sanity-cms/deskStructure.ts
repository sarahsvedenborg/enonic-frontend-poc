import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // English Content
            S.listItem()
                .title('English Content')
                .child(
                    S.list()
                        .title('English Content')
                        .items([
                            S.listItem()
                                .title('English Articles')
                                .child(
                                    S.documentList()
                                        .title('English Articles')
                                        .filter('_type == "article" && language == "en"')
                                ),
                            S.listItem()
                                .title('English Campaigns')
                                .child(
                                    S.documentList()
                                        .title('English Campaigns')
                                        .filter('_type == "campaign" && language == "en"')
                                ),
                            S.listItem()
                                .title('English Local Groups')
                                .child(
                                    S.documentList()
                                        .title('English Local Groups')
                                        .filter('_type == "localGroup" && language == "en"')
                                ),
                        ])
                ),

            // Norwegian Content
            S.listItem()
                .title('Norwegian Content')
                .child(
                    S.list()
                        .title('Norwegian Content')
                        .items([
                            S.listItem()
                                .title('Norwegian Articles')
                                .child(
                                    S.documentList()
                                        .title('Norwegian Articles')
                                        .filter('_type == "article" && language == "no"')
                                ),
                            S.listItem()
                                .title('Norwegian Campaigns')
                                .child(
                                    S.documentList()
                                        .title('Norwegian Campaigns')
                                        .filter('_type == "campaign" && language == "no"')
                                ),
                            S.listItem()
                                .title('Norwegian Local Groups')
                                .child(
                                    S.documentList()
                                        .title('Norwegian Local Groups')
                                        .filter('_type == "localGroup" && language == "no"')
                                ),
                        ])
                ),

            // Swedish Content
            S.listItem()
                .title('Swedish Content')
                .child(
                    S.list()
                        .title('Swedish Content')
                        .items([
                            S.listItem()
                                .title('Swedish Articles')
                                .child(
                                    S.documentList()
                                        .title('Swedish Articles')
                                        .filter('_type == "article" && language == "sv"')
                                ),
                            S.listItem()
                                .title('Swedish Campaigns')
                                .child(
                                    S.documentList()
                                        .title('Swedish Campaigns')
                                        .filter('_type == "campaign" && language == "sv"')
                                ),
                            S.listItem()
                                .title('Swedish Local Groups')
                                .child(
                                    S.documentList()
                                        .title('Swedish Local Groups')
                                        .filter('_type == "localGroup" && language == "sv"')
                                ),
                        ])
                ),

            // Danish Content
            S.listItem()
                .title('Danish Content')
                .child(
                    S.list()
                        .title('Danish Content')
                        .items([
                            S.listItem()
                                .title('Danish Articles')
                                .child(
                                    S.documentList()
                                        .title('Danish Articles')
                                        .filter('_type == "article" && language == "da"')
                                ),
                            S.listItem()
                                .title('Danish Campaigns')
                                .child(
                                    S.documentList()
                                        .title('Danish Campaigns')
                                        .filter('_type == "campaign" && language == "da"')
                                ),
                            S.listItem()
                                .title('Danish Local Groups')
                                .child(
                                    S.documentList()
                                        .title('Danish Local Groups')
                                        .filter('_type == "localGroup" && language == "da"')
                                ),
                        ])
                ),

            // All Content (for overview)
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

            // All other document types
            ...S.documentTypeListItems().filter(
                (listItem) => !['article', 'campaign', 'localGroup'].includes(listItem.getId() as string)
            ),
        ])
