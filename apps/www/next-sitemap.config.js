/**
 * Generate sitemap.xml and robots.txt for all kind of pages
 * @doc https://www.npmjs.com/package/next-sitemap
 */

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://usehooks-ts.com',
  changefreq: 'daily',
  priority: 0.7,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

export default config
