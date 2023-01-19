import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";

const categories = [
  { id: 1, name: "Programing" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Bca" },
  { id: 4, name: "React js" },
];

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`https://blogjs.tech/api/products`);
  const { data } = res.data;

  const fields2 = categories.map((item) => ({
    loc: `https://blogjs.tech/explore/category${item.name}`,
    lastmod: item.createdAt,
    priority: 0.7,
    changefreq: "daily",
  }));

  console.log({ fields2 });
  return getServerSideSitemap(ctx, fields2);
};

export default function SitemapIndex() {}
