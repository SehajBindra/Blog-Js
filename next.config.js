module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/products",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

//lh3.googleusercontent.com

module.exports = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.blogjs.tech",
      "blogjs.tech",
      "blog-beta-hazel.vercel.app",
      "play-lh.googleusercontent.com",
      "upload.wikimedia.org",
      "c.tenor.com",
      "blog-c7ff.kxcdn.com",
      "imageio.forbes.com",
      "qph.cf2.quoracdn.net",
      "encrypted-tbn0.gstatic.com",
      "i.pinimg.com",
    ],
  },
};
