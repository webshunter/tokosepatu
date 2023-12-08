export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/iklan/',
        },
        sitemap: 'https://rumahjo.com/sitemap.xml',
    }
}