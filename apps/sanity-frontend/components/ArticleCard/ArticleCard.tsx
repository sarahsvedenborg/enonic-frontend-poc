'use client'
import React from 'react'
import { Heading, Section } from 'ui-lib'
import { Link } from 'rk-designsystem'
import { Paragraph } from '@digdir/designsystemet-react'
import { urlFor } from '../../lib/sanity'
import './ArticleCard.css'

interface ArticleCardProps {
    topArticle: {
        image: any,
        article: {
            _id: string
            title: string
            slug: {
                current: string
            }
            excerpt?: string
            body?: any[]
            publishedAt?: string
            language?: string

        }
    }
}

export default function ArticleCard({ topArticle }: ArticleCardProps) {
    /*   console.log("topArticle", topArticle) */

    const imageUrl = topArticle?.image
        ? urlFor(topArticle.image).width(400).height(300).fit('crop').url()
        : null

    return (
        <Section width="md">
            <div className="article-card">
                <div className="article-card-content">
                    <div className="article-card-text">
                        <Heading level={2} className="article-card-title">
                            {topArticle?.article?.title}
                        </Heading>

                        {topArticle?.article?.excerpt && (
                            <Paragraph className="article-card-excerpt">
                                {topArticle?.article?.excerpt}
                            </Paragraph>
                        )}



                        <Link href={`/${topArticle?.article?.slug?.current}`} className="article-card-link">
                            Les mer om oss
                        </Link>
                    </div>

                    <div className="article-card-image">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={topArticle?.article?.title}
                                className="article-image"
                            />
                        ) : (
                            <div className="article-image-placeholder">
                                <div className="placeholder-content">
                                    <div className="placeholder-icon">📱</div>
                                    <Paragraph className="placeholder-text">Hjertestartere er enkle å bruke</Paragraph>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    )
}
