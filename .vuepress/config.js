module.exports = {
    title: 'MySuite',
    ga: 'UA-130998564-1',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Tags', link: '/tags/'},
            { text: 'Services', link: '/about/'},
            { text: 'Contact', link: '/contact/'}
        ],
        base:'/base-doc/',
        sidebar: [
            '/',
            '/blog/',
            '/tags/',
            '/about/',
            '/contact/'
        ]
    },
    plugins: {
        'sitemap': {
            hostname: 'https://mysuite.tech'
        },
    }
}