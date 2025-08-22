

import { Context, PartProps, VariablesGetterResult } from '@enonic/nextjs-adapter';
import Link from 'next/link';
import React from 'react'
import { Card } from 'rk-designsystem';
import { ChildLinkList } from '../../ui';

const FORBIDDEN_TYPES_REGEXP = "^media:.*|portal:fragment|portal:template-folder|portal:page-template$";

const ChildList = (props: PartProps) => {
    const { data, meta } = props;
    const children = data.get.children;
    if (!children || children.length === 0) {
        return null;
    }

    const prefix = meta.baseUrl +
        (meta.locale && meta.locale !== meta.defaultLocale ? meta.locale + '/' : '');
    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            {
                children &&
                /*         <div>
                            {children.map((child: any, i: number) => (
                                <Card
                                    data-color="neutral"
                                    style={{
                                        maxWidth: '300px'
                                    }}
                                >
                                    <Card.Block>
                                        <img
                                            alt="Random placeholder image"
                                            src="https://picsum.photos/seed/storybook/300/200"
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
                                            {child.displayName}
                                        </h3>
                                        <p>
                                            The image uses an online placeholder.
                                        </p>
                                    </Card.Block>
                                </Card>
                            ))}
                        </div> */
                <ul>{
                    children.map((child: any, i: number) => (
                        <li key={i}>
                            <Link href={prefix + child._path}>{child.displayName}</Link>
                        </li>
                    ))
                }</ul>

            }
            {children && <ChildLinkList links={children} />}
        </main>
    );
};

export default ChildList;

export const getChildList = {
    query: function (path: string, context?: Context, config?: any): string {
        return `query($path:ID!, $order:String){
              guillotine {
                getSite {
                  displayName
                }
                get(key:$path) {
                  displayName
                  children(sort: $order) {
                      _path(type: siteRelative)
                      _id
                      displayName
                      type
                  }
                }
              }
            }`
    },
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        return {
            path,
            order: config?.sorting
        }
    }
};

export async function childListProcessor(data: any, context?: Context, config?: any): Promise<any> {

    // exclude forbidden types
    data.get.children = data.get.children?.filter((child: any) => !child.type.match(FORBIDDEN_TYPES_REGEXP));

    return data;
}