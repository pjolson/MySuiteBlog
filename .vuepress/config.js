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
        dest: 'vuepress',
        sitemap: {
          filename: 'sitemap.txt',
          domain: 'http://mysuite.tech'
        },
        base:'/base-doc/',
        sidebar: [
            '/',
            '/blog/',
            '/tags/',
            '/about/'
        ]
    }
}