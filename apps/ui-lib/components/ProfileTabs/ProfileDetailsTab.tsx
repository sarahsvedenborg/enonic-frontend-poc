import { Heading } from "@digdir/designsystemet-react"
import { FiAtSign, FiEdit3, FiMapPin, FiPhone } from "react-icons/fi"
import { Card, Buttons, Tag } from "rk-designsystem"

interface ProfileDetailsTabProps {
    profile: { fullname: string, rodekorsNumber: string, rodekorsEmail: string, phone: string, email: string, address: string }
}

export const ProfileDetailsTab = ({ profile }: ProfileDetailsTabProps) => {
    const { fullname, rodekorsNumber, rodekorsEmail, phone, email, address } = profile


    const agreements = [{ title: 'Etikkerklæringen', description: 'Les og bekreft' }, { title: 'Taushetserklæringen', description: 'Les og bekreft' }]

    return <div className="rk-profile-details-tab-content">
        <Card
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
        </Card>

        <div >
            <Heading level={2} data-size="sm">Dine erklæringer</Heading>
            <hr />
            <div className="rk-profile-details-tab-agreements">
                {Array.isArray(agreements) && agreements.map(item => <Card
                    asChild
                    data-color="brand2"
                    style={{
                        maxWidth: '300px'
                    }}
                >
                    <button
                        onClick={function IW() { }}
                        type="button"
                    >
                        <Heading level={3} data-size="2xs">
                            {item.title}
                        </Heading>
                        <p>
                            {item.description}
                        </p>
                    </button>
                </Card>)}
            </div>
        </div>
        <div>
            <Heading level={2} data-size="sm">Din leder</Heading>
            <hr />
            <Card
                data-color="neutral"
                variant="default"
            >
                <Card.Block>
                    <h3>
                        Ola Norman
                    </h3>
                    <p>
                        <Tag
                            data-color="neutral"
                            data-size="xs"
                        >
                            Tønsberg
                        </Tag>
                        <Tag
                            data-color="neutral"
                            data-size="xs"
                        >
                            Fellesverket
                        </Tag>
                    </p>
                    <p>
                        <Tag
                            data-color="success"
                            data-size="xs"
                        >
                            Leder
                        </Tag>
                    </p>
                </Card.Block>
                <Card.Block>
                    <p> <small>
                        <FiPhone />
                        +47 11 22 33 44
                    </small>
                    </p>
                    <small>
                        <FiAtSign />
                        {email}
                    </small>
                </Card.Block>


            </Card>
        </div>
        <div className="rk-profile-details-tab-buttons">
            <Buttons type="button" variant="primary">
                <FiEdit3 />ENDRE
            </Buttons>
            <Buttons type="button" variant="secondary">
                LOGG UT
            </Buttons>
        </div>

    </div>
}