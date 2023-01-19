import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";

const categories = [
  { name: "Technology" },
  { name: "Programing" },
  { name: "React js" },
  { name: "Data Science" },
  { name: "Web-Development" },
  { name: "Bca" },
  { name: "Artificial Intelligence" },
  { name: "Entertainment" },
  { name: "Gaming" },
  { name: "Sports" },
  { name: "crypto" },
  { name: "Stock market" },
  { name: "others" },
];

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`https://blogjs.tech/api/products`);
  const { data } = res.data;

  const fields2 = categories.map((item) => ({
    loc: `https://blogjs.tech/explore/category/${item.name}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: "daily",
  }));

  //   console.log({ fields2 });
  return getServerSideSitemap(ctx, fields2);
};

export default function SitemapIndex() {}
