import { Heading } from "@digdir/designsystemet-react"
import { FiBox, FiCalendar, FiEdit3, FiMapPin, } from "react-icons/fi"
import { Card, Buttons, Tag } from "rk-designsystem"

interface ProfileKnowledgeTabProps {
    knowledge: { activities: any[]; roles: any[]; memberships: any[] }
}

export const ProfileKnowledgeTab = ({ knowledge }: ProfileKnowledgeTabProps) => {
    const { activities: activities2, roles, memberships } = knowledge


    const agreements = [{ title: 'Etikkerklæringen', description: 'Les og bekreft' }, { title: 'Taushetserklæringen', description: 'Les og bekreft' }]

    return <div className="rk-profile-details-tab-content">
        <div >
            <Heading level={2} data-size="sm">Røde Kors </Heading>
            <hr />
            <div className="rk-profile-details-tab-agreements">
                {true ? <Card
                    data-color="neutral"
                    variant="default"
                >
                    <Card.Block>
                        <Heading level={3} data-size="xs">
                            Startkurs
                        </Heading>

                        <Tag data-color="success" data-size="xs">Fullført</Tag>
                        <p> <small>
                            <FiCalendar />
                            01.01.2025
                        </small>
                        </p>
                        <p> <small>
                            <FiBox />
                            Fellesverket
                        </small>
                        </p>
                        <p>
                            <small>
                                <FiMapPin />
                                Lokalforening
                            </small>
                        </p>

                    </Card.Block>
                </Card> : <p>activitier</p>}

            </div>
        </div>
        <div>
            <Heading level={2} data-size="sm">Egen Kompetanse</Heading>
            <hr />
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <Heading level={3} data-size="xs">
                        Språk
                    </Heading>
                    <p> <small>
                        Ingen
                    </small>
                    </p>
                </Card.Block>
            </Card>
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <Heading level={3} data-size="xs">
                        Kjøretøy sertifikater
                    </Heading>
                    <p> <small>
                        Ingen
                    </small>
                    </p>
                </Card.Block>
            </Card>
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <Heading level={3} data-size="xs">
                        Politiattest
                    </Heading>
                    <p> <small>
                        Lastet opp - dato
                    </small>
                    </p>
                </Card.Block>
            </Card>
        </div>

        <div className="rk-profile-details-tab-buttons">
            <Buttons type="button" variant="primary">
                <FiEdit3 />ENDRE
            </Buttons>
        </div>

    </div>
}