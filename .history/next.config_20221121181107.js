export async function headers() {
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
}

export const images = {
  domains: [
    "lh3.googleusercontent.com",
    "variety.com",
    "play-lh.googleusercontent.com",
    "upload.wikimedia.org",
    "c.tenor.com",
    "i.pinimg.com",
  ],
};