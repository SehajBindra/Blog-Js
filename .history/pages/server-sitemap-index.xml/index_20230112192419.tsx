import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch("https://blogjs.tech/api/products");
  const posts: any[] = await response.json();

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `https://www.capsules.com/capsules/${post.slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
