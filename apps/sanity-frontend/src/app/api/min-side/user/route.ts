import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const RED_CROSS_USER_ENDPOINT = process.env.RED_CROSS_USER_ENDPOINT ?? 'https://api-dev.redcross.no/cms-data-sync/user'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    const userid = process.env.TEST_USER_ID ?? ''



    if (!userid) {
        return NextResponse.json({ error: 'userId query parameter is required' }, { status: 400 })
    }

    try {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        })

        const headers: HeadersInit = {
            Accept: 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.MIN_SIDE_SUBSCRIPTION_KEY ?? ''
        }

        if (token && typeof token.accessToken === 'string') {
            headers.Authorization = `Bearer ${token.accessToken}`
        }

        const response = await fetch(`${RED_CROSS_USER_ENDPOINT}/${encodeURIComponent(userid)}`, {
            headers
        })


        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json(
                {
                    error: 'Failed to fetch user data from Red Cross API',
                    details: errorText || `${response.status} ${response.statusText}`
                },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in Min side user route:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json(
            {
                error: 'Internal server error',
                message
            },
            { status: 500 }
        )
    }
}

