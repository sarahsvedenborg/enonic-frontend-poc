'use client'

import Link from "next/link";
import { Card } from "rk-designsystem";

export const ChildLinkList = ({ links }: { links: any[] }) => {
    return (
        <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            padding: '1rem 0'
        }}>
            {links.map((link, index) => (
                <Link href={link._path} key={index}>
                    <Card
                        key={index}
                        data-color="neutral"
                        style={{
                            width: '100%',
                            height: 'fit-content'
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
                </Link>
            ))}
        </div>
    );
}

export default ChildLinkList;