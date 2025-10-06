import { Heading } from '@digdir/designsystemet-react';
import { Section } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getAllNewsArticlesQuery } from '../../../lib/queries';
import { urlFor } from '../../../lib/sanity';
import Link from 'next/link';
import './page.css';

const getData = async () => {
    const newsArticles = await client.fetch(getAllNewsArticlesQuery, { lang: 'no' });
    return newsArticles;
}

export const revalidate = 20;

export default async function AktueltPage() {
    const newsArticles = await getData();


    return (
        <>
            {/* Page Header */}
            <Section width="xl">
                <Section width="md" padding="lg">
                    <Heading level={1} data-size="xl">Aktuelt</Heading>
                    <p className="page-description">
                        Få de siste nyhetene og oppdateringene fra Røde Kors.
                    </p>
                </Section>
            </Section>

            {/* News Articles List */}
            <Section width="xl" >
                <Section width="md" >
                    {newsArticles && newsArticles.length > 0 ? (
                        <div className="news-articles-grid">
                            {newsArticles.map((article: any) => {
                                const imageUrl = article.mainImage
                                    ? urlFor(article.mainImage).width(400).height(250).fit('crop').url()
                                    : null;

                                return (
                                    <article key={article._id} className="news-article-card">
                                        <Link href={`/aktuelt/${article.slug.current}`} className="news-article-link">
                                            {imageUrl && (
                                                <div className="news-article-image">
                                                    <img
                                                        src={imageUrl}
                                                        alt={article.title}
                                                        className="article-image"
                                                    />
                                                </div>
                                            )}

                                            <div className="news-article-content">
                                                <h2 className="news-article-title">
                                                    {article.title}
                                                </h2>

                                                {article.excerpt && (
                                                    <p className="news-article-excerpt">
                                                        {article.excerpt.split(" ").slice(0, 25).join(" ")}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-articles">
                            <p>Ingen nyhetsartikler funnet.</p>
                        </div>
                    )}
                </Section>
            </Section>
        </>
    );
}
