import { Heading, Section } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getAllNewsArticlesQuery } from '../../../lib/queries';
import { urlFor } from '../../../lib/sanity';
import Link from 'next/link';
import './page.css';

const getData = async () => {
    const newsArticles = await client.fetch(getAllNewsArticlesQuery, { lang: 'no' });
    return newsArticles;
}

export default async function AktueltPage() {
    const newsArticles = await getData();
    console.log("News Articles", newsArticles.length);

    return (
        <>
            {/* Page Header */}
            <Section width="xl">
                <Section width="md" padding="lg">
                    <Heading level={1}>Aktuelt</Heading>
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
                                                        {article.excerpt}
                                                    </p>
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
