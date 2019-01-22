module.exports = {
    title: 'MySuite',
    ga: 'UA-130998564-1',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Tags', link: '/tags/'},
            { text: 'My Info', link: '/about/'}
        ],
        base:'/base-doc/',
        sidebar: [
            '/',
            '/blog/',
            '/tags/',
            '/about/'
        ]
    },
    plugins: {
        'sitemap': {
            hostname: 'https://mysuite.tech'
        },
    }
}