import { Paragraph } from '@digdir/designsystemet-react';
import { DeveloperNote, Heading, NewsletterSignUp, Section } from 'ui-lib';
import { client, urlFor } from '../../../../lib/sanity';
import { getNewsArticleBySlugQuery } from '../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../components/PortableText';


interface NewsArticlePageProps {
    params: Promise<{ slug: string }>;
}

const getData = async (slug: string) => {
    const news = await client.fetch(getNewsArticleBySlugQuery, { slug });
    return news;
}
export const revalidate = 20;

export default async function NewsPage({ params }: NewsArticlePageProps) {
    const { slug } = await params;


    const article = await getData(slug);


    if (!article) {
        notFound();
    }
    return (
        <>
            <Section width="xl" padding="none">
                <img src={urlFor(article.mainImage).width(1200).height(400).fit('crop').url()} alt={article.title} />
            </Section>
            <Section width="sm">
                <Heading level={1} >
                    {article.title}
                </Heading>
            </Section>
            <Section width="sm">
                <Paragraph data-size='xl'>
                    {article.excerpt}
                </Paragraph>
            </Section>
            <Section width="sm">
                {article.publishedAt && (
                    <span><span style={{ backgroundColor: 'var(--rk-red)', color: 'var(--rk-red)', height: '10px', width: '10px' }}>{'fff'}</span> <time >
                        {new Date(article.publishedAt).toLocaleDateString('no-NO')}
                    </time> - Skrevet av Røde Kors</span>
                )}
                <hr />
            </Section>




            {/* Main Content */}
            < Section width="xl" padding="lg" >
                <Section width="md" padding="lg">
                    {article.body && (
                        <div className="news-content">
                            <PortableText content={article.body} />
                        </div>
                    )}
                </Section>
            </Section >

            {/* News-specific sections */}
            < Section width="xl" background="under-development" padding="lg" >
                <Section width="md" padding="lg">
                    <Heading level={2}>Relaterte nyheter</Heading>

                    <div className="related-news">
                        <div className="news-item">
                            <Heading level={3}>Flere nyheter fra Røde Kors</Heading>
                            <p>Hold deg oppdatert på vårt arbeid og de siste nyhetene fra Røde Kors.</p>
                        </div>
                    </div>
                    <DeveloperNote>
                        <Paragraph>Her kan man enten:</Paragraph>
                        <ul>
                            <li>La redaktører manuelt lege til relaterte nyheter i sanity</li>
                            <li>Automatisk liste ut andre nyheter i frontend </li>
                        </ul>
                    </DeveloperNote>
                </Section>

            </Section >
            {/* Newsletter signup */}
            {!article.hideNewsletterSignUp && <NewsletterSignUp title="Få nyheter på e-post" description="Abonner på vårt nyhetsbrev og få de siste nyhetene direkte i innboksen din." />}
        </>
    );






    // Generate static params for all newsArticle slugs
    async function generateStaticParams() {
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
}