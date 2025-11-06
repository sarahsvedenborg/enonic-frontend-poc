import { Heading } from "@digdir/designsystemet-react"
import { FiArrowRight, FiBox, FiCalendar, FiMapPin, } from "react-icons/fi"
import { Card, Buttons, Tag } from "rk-designsystem"

interface ProfileActivityTabProps {
    activities: { activities: any[]; roles: any[]; memberships: any[] }
}

export const ProfileActivityTab = ({ activities }: ProfileActivityTabProps) => {
    const { activities: activities2, roles, memberships } = activities


    const agreements = [{ title: 'Etikkerklæringen', description: 'Les og bekreft' }, { title: 'Taushetserklæringen', description: 'Les og bekreft' }]

    return <div className="rk-profile-details-tab-content">
        {/*   <Card
            data-color="neutral"
            variant="default"
        >
            <Card.Block>
                <h3>
                    {fullname} (fra OKTA)
                </h3>
                <p>
                    Røde Kors nr.: {rodekorsNumber}
                </p>
                <p>
                    {rodekorsEmail} <strong>(fra OKTA)</strong>
                </p>
            </Card.Block>
            <Card.Block>
                <small>
                    <FiPhone />
                    {phone} <strong>(fra OKTA)</strong>
                </small>
            </Card.Block>
            <Card.Block>
                <small>
                    <FiAtSign />
                    {email} <strong>(fra OKTA)</strong>
                </small>
            </Card.Block>
            <Card.Block>
                <small>
                    <FiMapPin />
                    {address}
                </small>
            </Card.Block>
            <Card.Block>
                <p>  <small>
                    <strong>Pårørende</strong>
                </small></p>
                <small>
                    Legg til kontaktinformajson til pårørende
                </small>
            </Card.Block>
        </Card> */}

        <div >
            <Heading level={2} data-size="sm">Aktiviteter </Heading>
            <hr />
            <div className="rk-profile-details-tab-agreements">
                {activities2.length === 0 ? <Card
                    data-color="neutral"
                    variant="default"
                >
                    <Card.Block>
                        <Heading level={3} data-size="xs">
                            Ingen aktiviteter
                        </Heading>


                        <p> <small>
                            <FiCalendar />
                            Startdato - Sluttdato
                        </small>
                        </p>
                        <p> <small>
                            <FiBox />
                            Velg en aktivitet fra aktivitetskatalog
                        </small>
                        </p>
                        <p>
                            <small>
                                <FiMapPin />
                                Velg en lokalforening
                            </small>
                        </p>

                    </Card.Block>
                </Card> : <p>activitier</p>}

            </div>
        </div>
        <div>
            <Heading level={2} data-size="sm">Verv og roller</Heading>
            <hr />
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <Heading level={3} data-size="xs">
                        Ingen verv eller rolle
                    </Heading>


                    <p> <small>
                        <FiCalendar />
                        Startdato - Sluttdato
                    </small>
                    </p>
                    <p> <small>
                        <FiBox />
                        Aktivitet
                    </small>
                    </p>
                    <p>
                        <small>
                            <FiMapPin />
                            Lokalforening
                        </small>
                    </p>

                </Card.Block>
            </Card>
        </div>
        <div>
            <Heading level={2} data-size="sm">Medlemskap</Heading>
            <hr />
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <Heading level={3} data-size="xs">
                        Ikke medlem
                    </Heading>
                    <Tag
                        data-color="danger"
                        data-size="xs"
                    >
                        Ingen
                    </Tag>

                    <p> <small>
                        <FiCalendar />
                        Startdato - Sluttdato
                    </small>
                    </p>
                    <small>
                        <FiMapPin />
                        Lokalforening
                    </small>
                    <Buttons type="button" variant="primary">
                        BLI MEDLEM<FiArrowRight />
                    </Buttons>
                </Card.Block>
            </Card>
        </div>


    </div>
}