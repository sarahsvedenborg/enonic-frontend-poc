import { Heading, Section, DonationForm } from 'ui-lib';
import { client } from '../../../../lib/sanity';
import { getNewsArticleBySlugQuery } from '../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../components/PortableText';
import CampaignHero from '../../../../components/CampaignHero';


interface NewsArticlePageProps {
    params: Promise<{ slug: string }>;
}

const getData = async (slug: string) => {
    const news = await client.fetch(getNewsArticleBySlugQuery, { slug });
    return news;
}

export default async function NewsPage({ params }: NewsArticlePageProps) {
    const { slug } = await params;


    const article = await getData(slug);


    if (!article) {
        notFound();
    }
    return (
        <>
            {/* News Hero Section - smaller than regular articles */}
            <section
                className="news-hero"
                style={{
                    backgroundImage: article?.backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                }}
            >
                <div className="news-hero-content">
                    <div className="news-hero-text">
                        <Heading level={1} className="news-title">
                            {article.title}
                        </Heading>

                        {article.publishedAt && (
                            <time className="news-date">
                                {new Date(article.publishedAt).toLocaleDateString('no-NO')}
                            </time>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    {article.body && (
                        <div className="news-content">
                            <PortableText content={article.body} />
                        </div>
                    )}
                </Section>
            </Section>

            {/* News-specific sections */}
            <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Relaterte nyheter</Heading>

                    <div className="related-news">
                        <div className="news-item">
                            <Heading level={3}>Flere nyheter fra Røde Kors</Heading>
                            <p>Hold deg oppdatert på vårt arbeid og de siste nyhetene fra Røde Kors.</p>
                        </div>
                    </div>
                </Section>
            </Section>

            {/* Newsletter signup */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <div className="newsletter-section">
                        <Heading level={2}>Få nyheter på e-post</Heading>
                        <p>Abonner på vårt nyhetsbrev og få de siste nyhetene direkte i innboksen din.</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Din e-postadresse" className="newsletter-input" />
                            <button className="btn-primary">Abonner</button>
                        </div>
                    </div>
                </Section>
            </Section>
        </>
    );






    // Generate static params for all newsArticle slugs
    export async function generateStaticParams() {
        try {
            const slugs = await client.fetch(`
            *[_type == "newsArticle" && defined(slug.current)][] {
                "slug": slug.current
            }
            `);

            return slugs.map((item: { slug: string }) => ({
                slug: item.slug,
            }));
        } catch (error) {
            console.error('Error generating static params:', error);
            return [];
        }
    }
