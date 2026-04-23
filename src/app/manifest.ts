import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Himali Joshi | Best Singer in India & Gujarat',
        short_name: 'Himali Joshi',
        description: 'Official website of Himali Joshi - Playback Singer, Performer & Voice Artist',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#d4af37',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
