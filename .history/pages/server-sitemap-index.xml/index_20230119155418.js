import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";



export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`https://blogjs.tech/api/products`);
  const { data } = res.data;
  const fields = data.map((item) => ({
    loc: `https://blogjs.tech/blog/${item.slug}`,
    lastmod: item.lastmod ? item.updatedAt : item.createdAt,
    priority: 0.7,
    changefreq: "daily",
  }));

  
    console.log({ fields });
  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}
