import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client, urlFor } from '../../../../../../lib/sanity'
import { getBranchBySlugQuery, getAllNewsPerBranchQuery } from '../../../../../../lib/queries'
import { notFound } from 'next/navigation'
import BranchHeader from '../../../../../../components/BranchHeader'
import './page.css'

interface BranchNewsPageProps {
    params: Promise<{ district: string, branch: string }>
}

export const revalidate = 60

const getData = async (slug: string) => {
    const id = slug.split('-').pop()
    console.log("Branch ID for news:", id)

    const [branchData, allNewsArticles] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { id }),
        client.fetch(getAllNewsPerBranchQuery, { lang: 'no', id })
    ])




    return { branchData, branchNewsArticles: allNewsArticles }
}

export default async function BranchNewsPage({ params }: BranchNewsPageProps) {
    const { district, branch } = await params
    const { branchData, branchNewsArticles } = await getData(branch)


    if (!branchData) {
        notFound()
    }

    return (
        <>
            {/* Branch Header */}
            <BranchHeader
                image={branchData.mainImage}
                branchName={branchData.branchName}
                branchParent={branchData.branchParent}
                branchLocation={branchData.branchLocation}
                communicationChannels={branchData.communicationChannels}
                branchContacts={branchData.branchContacts}
            />

            {/* Navigation Breadcrumb */}
            <Section width="xl" padding="sm">
                <Section width="md" padding="sm">
                    <nav className="breadcrumb">
                        <Link href="/lokalforeninger" className="breadcrumb-link">
                            Lokalforeninger
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link
                            href={`/lokalforeninger/${district}/${branch}`}
                            className="breadcrumb-link"
                        >
                            {branchData.branchName}
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">Nyheter</span>
                    </nav>
                </Section>
            </Section>

            {/* Page Header */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={1} data-size="xxl">
                        Nyheter fra {branchData.branchName}
                    </Heading>
                    <Paragraph data-size="lg" className="page-description">
                        Hold deg oppdatert på det som skjer i din lokale Røde Kors-forening.
                    </Paragraph>
                </Section>
            </Section>

            {/* News Articles */}
            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    {branchNewsArticles.length > 0 ? (
                        <div className="news-articles-grid">
                            {branchNewsArticles.map((article: any) => (
                                <article key={article._id} className="news-article-card">
                                    <Link
                                        href={`/aktuelt/${article.slug.current}`}
                                        className="news-article-link"
                                    >
                                        <div className="news-article-image">
                                            {article.mainImage ? (
                                                <img
                                                    src={urlFor(article.mainImage).width(400).height(250).fit('crop').url()}
                                                    alt={article.title}
                                                    className="article-image"
                                                />
                                            ) : (
                                                <div className="article-image-placeholder">
                                                    <div className="placeholder-content">
                                                        <div className="placeholder-icon">📰</div>
                                                        <Paragraph className="placeholder-text">Nyhet</Paragraph>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="news-article-content">
                                            <Heading level={3} data-size="md" className="news-article-title">
                                                {article.title}
                                            </Heading>

                                            {article.excerpt && (
                                                <Paragraph data-size="sm" className="news-article-excerpt">
                                                    {article.excerpt}
                                                </Paragraph>
                                            )}

                                            {article.publishedAt && (
                                                <time className="news-article-date">
                                                    {new Date(article.publishedAt).toLocaleDateString('no-NO', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            )}
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="no-news">
                            <Heading level={2} data-size="lg">
                                Ingen nyheter ennå
                            </Heading>
                            <Paragraph data-size="md">
                                Det er ingen nyheter publisert for denne lokalforeningen ennå.
                                Sjekk tilbake senere for oppdateringer.
                            </Paragraph>
                        </div>
                    )}
                </Section>
            </Section>
        </>
    )
}
