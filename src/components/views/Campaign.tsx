'use client'
import React from 'react'
import {FetchContentResult, getUrl, I18n} from '@enonic/nextjs-adapter';
import Link from 'next/link';
import { Buttons as Button } from 'rk-designsystem'

const Campaign = (props: FetchContentResult) => {
     const {displayName, data, parent} = props.data?.get as any;
      const {teaser, bio} = data;
     console.log("data", data)
/*     const meta = props.meta;  */ 

    return (
        <>
            <div>
       
                 <h2>{displayName}</h2>
                  <p>{teaser}</p> 
                  <Button variant="primary">
  Lagre
</Button>
             {/*    {
                    photos.map((photo: any, i: number) => (
                        <img key={i}
                             src={getUrl(photo.imageUrl, meta)}
                             title={getTitle(photo, displayName)}
                             alt={getTitle(photo, displayName)}
                             width="500"
                        />
                    ))
                }  */}
            </div>
            {/* <p><Link href={getUrl(`/${parent._path}`, meta)}>{I18n.localize('back')}</Link></p> */}
        </>
    )
}

export default Campaign;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
