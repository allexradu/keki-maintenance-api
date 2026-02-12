import { ENVS } from '@const/types'

export const faviconController = async () => {
    const faviconUrl = ENVS.FAVICON_URL
    const faviconResponse = await fetch(faviconUrl)
    const favicon = await faviconResponse.arrayBuffer()
    return new Response(favicon, {
        headers: {
            'Content-Type': 'image/x-icon',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
