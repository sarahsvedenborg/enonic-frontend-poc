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
    console.log("article", article)
    return (
        <>
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
                        {article?.relatedContent?.map((relatedContent) => (
                            <div className="related-article" key={relatedContent._id}>
                                <Heading level={3}>{relatedContent.title}</Heading>
                                <p>{relatedContent.excerpt}</p>
                            </div>
                        ))}
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
