import { useEffect, useState } from "react";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb2";
export default function ProductsPage({ products, page }) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= scrollHeight && !loading && hasMore) {
      loadMore();
    }
  };

  const loadMore = async () => {
    setLoading(true);
    const res = await fetch(`/api/products?page=${page + 1}`);
    const newProducts = await res.json();
    setLoading(false);

    if (newProducts.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link href={`/products/${product.slug}`}>
              <a>
                <h2>{product.title}</h2>
              </a>
            </Link>
            <p>Created by {product.username}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const page = params && params.page ? parseInt(params.page, 10) : 1;
  const productsPerPage = 10;

  const productsCursor = db
    .collection("products")
    .find(
      {},
      {
        projection: {
          title: 1,
          img: 1,
          username: 1,
          userimg: 1,
          slug: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ $natural: -1 })
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage);

  const products = await productsCursor.toArray();

  return {
    props: {
      products: products.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        img: product.img,
        username: product.username.trim(),
        userimg: product.userimg,
        slug: product.slug,
        createdAt: product.createdAt.toISOString(),
      })),
      page,
    },
    revalidate: 1,
  };
}
