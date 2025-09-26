import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Section } from 'ui-lib';

export default function HomePage() {
    return (
        <Section width="xl" padding="lg">
            <Heading level={1} data-size="xl">Forside fra sanity</Heading>
            <Paragraph data-size="lg">
                Velkommen til vår Sanity-baserte frontend. Her kan du se kampanjer og annet innhold.
            </Paragraph>
        </Section>
    )
}
