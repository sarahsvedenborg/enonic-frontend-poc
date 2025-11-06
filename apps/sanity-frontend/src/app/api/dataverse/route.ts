import { NextRequest, NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
    try {
        // Get userid from query parameters
        const searchParams = request.nextUrl.searchParams
        const userid = searchParams.get('userid')



        if (!userid) {
            return NextResponse.json(
                { error: 'userid query parameter is required' },
                { status: 400 }
            )
        }

        // Get the Dataverse endpoint URL from environment variables
        const dataverseUrl = process.env.DATAVERSE_API_URL || ''

        if (!dataverseUrl) {
            return NextResponse.json(
                { error: 'Dataverse API URL is not configured' },
                { status: 500 }
            )
        }

        // Construct the full URL with userid
        const url = `${dataverseUrl}?userid=${encodeURIComponent(userid)}`

        // Get access token from next-auth.session-token cookie
        const sessionToken = request.cookies.get('next-auth.session-token')?.value

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        // Decode the JWT token to get the access token
        let accessToken: string | undefined

        if (sessionToken) {
            try {
                const secret = process.env.NEXTAUTH_SECRET
                if (secret) {
                    const decoded = await decode({
                        token: sessionToken,
                        secret: secret,
                    })
                    accessToken = decoded?.accessToken as string | undefined
                }
            } catch (error) {
                console.error('Error decoding session token:', error)
            }
        }

        // If we have an access token, add it to the Authorization header
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`
        }

        // Call the Dataverse endpoint
        const response = await fetch(url, {
            method: 'GET',
            headers,
        })

        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json(
                {
                    error: 'Failed to fetch data from Dataverse',
                    details: errorText,
                    status: response.status
                },
                { status: response.status }
            )
        }

        const data = await response.json()

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error('Error calling Dataverse API:', error)
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
