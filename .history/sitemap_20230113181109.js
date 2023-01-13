module.exports = {
  siteUrl: "https://blogjs.tech",
  generateRobotsTxt: true,

  // sitemapSize: 7000,
  exclude: [`https://blogjs.tech/server-sitemap-index.xml`],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/secret" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`https://blogjs.tech/server-sitemap-index.xml`],
  },
  exclude: ["/secret"],
};
