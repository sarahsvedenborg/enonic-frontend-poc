import { Heading, Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import Section from '../Section/Section'

export const CardList = ({ title, titleLevel = 2, items }: { title?: string, titleLevel: 1 | 2 | 3 | 4 | 5 | 6; items: any[] }) => {

    return (
        <Section width="xl" padding="lg">
            <Section width="md" padding="lg">
                {title && <Heading level={titleLevel}>{title}</Heading>}
                <div className="support-options grid-2">
                    {items.map((item) => (
                        <div key={item._id} className="support-option card">
                            <Link href={item.slug.current || '/'} key={item._id}>
                                <Heading level={3}>{item.title}</Heading>
                                <Paragraph>{item.excerpt}</Paragraph>
                            </Link>
                        </div>
                    ))}
                </div>
            </Section>
        </Section>
    )
}