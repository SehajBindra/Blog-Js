import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const response = await fetch("https://blogjs.tech/api/products");
  const posts = await response.json();

  const fields = posts.map((post) => ({
    loc: `https://blogjs.tech/blog/${post.slug}`,
    lastmod: new Date().toISOString(),
  }));

  console.log(fields);

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
