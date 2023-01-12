import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const response = await fetch("https://blogjs.tech/api/products");
  const post = await response.json();

  const fields = post?.map((posts) => ({
    loc: `https://blogjs.tech/blog/${posts.slug}`,
    lastmod: new Date().toISOString(),
  }));

  console.log(fields);

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
