import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { connectToDatabase } from "../util/mongodb2";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
// import Header from "../components/Header";
// import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";
// const Helmet = dynamic(() => import("react-helmet"));
// import Sidebar from "../components/Sidebar";
// import Products from "../components/Products";
// import Footer from "../components/Footer";
// import ProductSection from "./../components/ProductSection";
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/Header"));
const Sidebar = dynamic(() => import("../components/Sidebar"));
const Products = dynamic(() => import("../components/Products"));
const ProductSection = dynamic(() => import("../components/ProductSection"));
const Footer = dynamic(() => import("../components/Footer"));
export default function Home({ products }) {
  // console.log(products);
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://localhost:3000/api/products";
  const url = "https://blog-beta-hazel.vercel.app/api/products";
  const url2 = "https://blogjs.tech/api/products";
  const [visible, setVisible] = useState(10);

  const fetchdata = async () => {
    const dev = process.env.NODE_ENV !== "production";
    await fetch(`${dev ? baseUrl : url2}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 8);
  };

  return (
    <>
      <Head>
        <title>Blog JS | Home</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        {/* <!-- Primary Meta Tags --> */}
        <title>Blog JS </title>
        <meta name="title" content="Blog JS " />
        <meta
          name="description"
          content="Blog.js is a cutting-edge technology and programming blog website that utilizes the power of the Blog.js JavaScript library to deliver a seamless and dynamic user experience. The website is focused on providing the latest news, tutorials, and insights on the world of technology and programming.


One of the standout features of the Blog.js website is its real-time functionality. Users can interact with the website in real-time, with the ability to like, comment and save posts, making the website feel more like a community rather than a static blog.

The website also has a dynamic page routing system that allows users to easily navigate through a large number of posts, making it easy to find what they're looking for. The website also has a powerful search functionallity that allows users to quickly find specific posts or articles based on keywords, categories or tags.

In addition, Blog.js website is fully integrated with Google authentication, allowing users to sign in to the website using their Google account, making it easy for users to create an account and start interacting with the community.

The website also has a sleek and modern design, with a focus on clean lines and a user-friendly interface. It's fully responsive, which means it works seamlessly across all devices, whether it's a desktop, laptop, tablet or mobile device.

Overall, Blog.js website is a great choice for anyone interested in technology and programming. It offers a wealth of information, insights and community-driven content, all in a dynamic and interactive environment that is easy to navigate and use.


"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogjs.tech/" />
        <meta property="og:title" content="Blog JS " />
        <meta
          property="og:description"
          content="Blog.js is a cutting-edge technology and programming blog website that utilizes the power of the Blog.js JavaScript library to deliver a seamless and dynamic user experience. The website is focused on providing the latest news, tutorials, and insights on the world of technology and programming.


One of the standout features of the Blog.js website is its real-time functionality. Users can interact with the website in real-time, with the ability to like, comment and save posts, making the website feel more like a community rather than a static blog.

The website also has a dynamic page routing system that allows users to easily navigate through a large number of posts, making it easy to find what they're looking for. The website also has a powerful search functionallity that allows users to quickly find specific posts or articles based on keywords, categories or tags.

In addition, Blog.js website is fully integrated with Google authentication, allowing users to sign in to the website using their Google account, making it easy for users to create an account and start interacting with the community.

The website also has a sleek and modern design, with a focus on clean lines and a user-friendly interface. It's fully responsive, which means it works seamlessly across all devices, whether it's a desktop, laptop, tablet or mobile device.

Overall, Blog.js website is a great choice for anyone interested in technology and programming. It offers a wealth of information, insights and community-driven content, all in a dynamic and interactive environment that is easy to navigate and use.


"
        />
        <meta property="og:image" content="" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blogjs.tech/" />
        <meta property="twitter:title" content="Blog JS " />
        <meta
          property="twitter:description"
          content="Blog.js is a cutting-edge technology and programming blog website that utilizes the power of the Blog.js JavaScript library to deliver a seamless and dynamic user experience. The website is focused on providing the latest news, tutorials, and insights on the world of technology and programming.


One of the standout features of the Blog.js website is its real-time functionality. Users can interact with the website in real-time, with the ability to like, comment and save posts, making the website feel more like a community rather than a static blog.
The website also has a dynamic page routing system that allows users to easily navigate through a large number of posts, making it easy to find what they're looking for. The website also has a powerful search functionallity that allows users to quickly find specific posts or articles based on keywords, categories or tags.

In addition, Blog.js website is fully integrated with Google authentication, allowing users to sign in to the website using their Google account, making it easy for users to create an account and start interacting with the community.

The website also has a sleek and modern design, with a focus on clean lines and a user-friendly interface. It's fully responsive, which means it works seamlessly across all devices, whether it's a desktop, laptop, tablet or mobile device.

Overall, Blog.js website is a great choice for anyone interested in technology and programming. It offers a wealth of information, insights and community-driven content, all in a dynamic and interactive environment that is easy to navigate and use.


"
        />
        <meta property="twitter:image" content=""></meta>
        <meta property="og:title" content="BlogJS || Home" />
        <meta
          property="og:description"
          content="This is the  Home page of BlogJS"
        />
        <meta property="og:image" content="/logo.jpeg" />
        <meta property="og:url" content="https://blogjs.tech/" />
        <meta name="description" content={`welcome to blogjs.tech`} />
        <meta name="description" content={`welcome to Blog JS`} />
        <meta
          name="google-site-verification"
          content="28jDfp2oEibVP-WSNODioOCe6YuLFPgLOREq-GD87Uw"
        />
        <Script
          strategy="lazyOnload"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3030825364916957"
          crossorigin="anonymous"
        />

        <link rel="icon" href="/logo.jpeg" />
      </Head>

      <div className="bg-black text-white overflow-y-scroll h-screen snap-y snap-mandatory z-0  mx-auto">
        {/* <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet> */}

        {/* <Toaster /> */}
        <Header />

        <main className=" sm:grid sm:grid-cols-10 ">
          <Sidebar />

          <div className=" flex flex-row col-span-8  max-h-screen sm:col-span-8  overflow-x-scroll overflow-y-scroll scrollbar-hide">
            {products.slice(0, 4).map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
          {/* <Widgets /> */}
        </main>

        <div className=" productSection   ">
          {products.slice(4, visible).map((product) => (
            <ProductSection key={product._id} product={product} />
          ))}
          <div
            onClick={showmoreItems}
            className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-16"
          >
            <button className="loadMore"> Load more </button>

            <ArrowDownIcon className="arrow" />
          </div>
        </div>

        <Modal />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=43200, stale-while-revalidate=60"
  // );
  const products = await db
    .collection("products")
    .find({})
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      products: products.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        // desc: product.desc.trim(),
        img: product.img,
        username: product.username.trim(),
        userimg: product.userimg,
        // category: product.category,
        slug: product.slug.trim(),
        createdAt: product.createdAt.toISOString(),
      })),
    },

    revalidate: 1,
  };
}
