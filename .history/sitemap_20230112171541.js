module.exports = {
  siteUrl: "https://blogjs.tech",
  generateRobotsTxt: true,

  // sitemapSize: 7000,

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/secret" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `https://blogjs.tech/sitemap.xml`,
      `https://blogjs.tech/server-sitemap.xml`,
    ],
  },
  exclude: ["/secret"],
};
