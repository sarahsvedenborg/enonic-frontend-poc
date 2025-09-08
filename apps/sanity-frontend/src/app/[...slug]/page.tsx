import { Heading, Section } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getArticleBySlugQuery } from '../../../lib/queries';
import { notFound } from 'next/navigation';


import { ArticlePage } from '../../../components/ArticlePage/ArticlePage';
// import NewsArticleView from '../../components/NewsArticleView';


interface DynamicPageProps {
    params: Promise<{ slug: string[] }>;
}

const getData = async (slug: string) => {
    const article = await client.fetch(getArticleBySlugQuery, { slug });
    return article;
}
export const revalidate = 60;

export default async function DynamicPage({ params }: DynamicPageProps) {
    const { slug } = await params;
    const slugString = slug.join('/');

    const article = await getData(slugString);

    if (!article) {
        notFound();
    }

    // Switch based on content type
    switch (article._type) {
        case 'article':
            return <ArticlePage article={article} />;
        /*     case 'newsArticle':
                return <NewsArticleView article={article} />; */
        default:
            return <ArticlePage article={article} />;
    }
}

// Generate static params for all article slugs
export async function generateStaticParams() {
    try {
        const slugs = await client.fetch(`
            *[_type in ["article", "newsArticle"] && defined(slug.current)][] {
                "slug": slug.current
            }
        `);

        return slugs.map((item: { slug: string }) => ({
            slug: item.slug.split('/'),
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}
