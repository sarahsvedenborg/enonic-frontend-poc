'use client'

import { Card } from "rk-designsystem";

export const ChildLinkList = ({ links }: { links: any[] }) => {
    return <div>
        {links.map((link) => (
            <Card
                data-color="neutral"
                style={{
                    maxWidth: '300px'
                }}
            >
                <Card.Block>
                    <img
                        alt="Random placeholder image"
                        src="https://www.rodekors.no/globalassets/_landene-vi-jobber-i/_midtosten-og-nord-afrika/palestina/250707_gaza_feltsykehus_1600.jpg?width=1600&quality=90"
                        style={{
                            aspectRatio: '3 / 2',
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%'
                        }}
                    />
                </Card.Block>
                <Card.Block>
                    <h3>
                        {link.displayName}
                    </h3>
                    {/* <p>
                        The image uses an online placeholder.
                    </p> */}
                </Card.Block>
            </Card>
        ))}
    </div>
}

export default ChildLinkList;