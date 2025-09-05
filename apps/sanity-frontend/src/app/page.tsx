import { Heading, Section } from 'ui-lib';

export default function HomePage() {
    return (
        <Section width="xl" padding="lg">
            <Heading level={1}>Forside fra sanity</Heading>
            <p className="text-lg text-gray-600 mt-4">
                Velkommen til vår Sanity-baserte frontend. Her kan du se kampanjer og annet innhold.
            </p>
        </Section>
    )
}
