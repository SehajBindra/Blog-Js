import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx) {
  const response = await fetch("https://blogjs.tech/api/products");
  console.log(response);
  const posts = await response.json();

  // const fields = posts.map((post) => ({
  //   loc: `https://blogjs.tech/blog/${post.slug}`,
  //   lastmod: post.lastmod ? post.lastmod : post.created_at,
  // }));

  return getServerSideSitemap(ctx);
}

export default function Site() {}
