import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  transform(rawData) {
    return rawData
      .filter(page => !page.frontmatter.blog_index && !page.frontmatter.hidden)
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  }
})
