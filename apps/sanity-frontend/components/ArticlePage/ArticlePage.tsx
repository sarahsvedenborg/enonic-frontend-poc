import { Paragraph } from '@digdir/designsystemet-react';
import { Heading, Section, } from 'ui-lib';
import { urlFor } from '../../lib/sanity';
import PortableText from './../PortableText';
import { Article } from '../../lib/sanity';
import './articlePage.css';

interface ArticlePageProps {
    article: Article;
}

export const ArticlePage = ({ article }: ArticlePageProps) => {
    const backgroundImage = article.mainImage ? urlFor(article.mainImage).width(1600).height(600).fit('crop').url() : null;

    return (
        <>

            {/*     <section
                className="article-hero"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
            >
                <div className="article-hero-content">
                    <div className="article-hero-text">
                        <Heading level={1} className="article-title">
                            {article.title}
                        </Heading>

                        {article.excerpt && (
                            <p className="article-excerpt">
                                {article.excerpt}
                            </p>
                        )}

                        {article.publishedAt && (
                            <time className="article-date">
                                {new Date(article.publishedAt).toLocaleDateString('no-NO')}
                            </time>
                        )}
                    </div>
                </div>
            </section> */}
            <Section width="sm">

                <Heading level={1} >
                    {article.title}
                </Heading>
            </Section>
            <Section width="sm">
                <Paragraph data-size='xl'>
                    {article.excerpt}
                </Paragraph>
                {/*   <time className="article-date">
                    {new Date(article.publishedAt).toLocaleDateString('no-NO')}
                </time> */}
            </Section>
            {/* Main Content */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    {article.body && (
                        <div className="article-content">
                            <PortableText content={article.body} />
                        </div>
                    )}
                </Section>
            </Section>

            {/* Additional sections based on the Røde Kors children and youth page structure */}
            <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Relaterte artikler og rapporter</Heading>

                    <div className="related-articles">
                        <div className="related-article">
                            <Heading level={3}>Kurset Tør du å lytte er oppdatert</Heading>
                            <p>I 2023 har Tør du å lytte-kurset fått en etterlengtet oppdatering.</p>
                        </div>

                        <div className="related-article">
                            <Heading level={3}>Når pengene ikke strekker til</Heading>
                            <p>Nesten 70.000 barn under 18 år lever i familier som mottar økonomisk sosialhjelp. Den ferske rapporten «Til barnets beste?» handler om hvordan sosialhjelpsordningen fungerer for barnefamilier.</p>
                        </div>

                        <div className="related-article">
                            <Heading level={3}>Psykt flink - en rapport om stress og press blant ungdom</Heading>
                            <p>En fersk rapport fra Røde Kors viser at én av fire ungdommer ikke snakker med andre om problemene sine. Samtidig må helsesøstre avvise ungdom i døren på grunn av tidspress.</p>
                        </div>
                    </div>
                </Section>
            </Section>

            {/* Call to Action Section */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <div className="cta-section">
                        <Heading level={2}>Vil du vite mer?</Heading>
                        <p>Dersom du ønsker å støtte dette arbeidet, ønsker vi deg velkommen som medlem i Røde Kors.</p>
                        <div className="cta-buttons">
                            <button className="btn-primary">Bli medlem</button>
                            <button className="btn-secondary">Kontakt oss</button>
                        </div>
                    </div>
                </Section>
            </Section>
        </>
    );
}

export default ArticlePage;
