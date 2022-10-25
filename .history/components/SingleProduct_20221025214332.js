import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Modal from "../components/Modal";
import dynamic from "next/dynamic";
import Parser from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { motion, Variants } from "framer-motion";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ product }) {
  // React quill
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  // Rich text Editor
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],

      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const notify = () =>
    toast.success("Deleted", {
      duration: 2000,
    });
  const updated = () =>
    toast.success("Updated", {
      duration: 4000,
    });
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [img, setImg] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = "http://localhost:3000/api/products";
  const url = "https://blog-beta-hazel.vercel.app/api/products";

  // Logic for deleting Post
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const dev = process.env.NODE_ENV !== "production";

      const res = await axios
        .delete(`${dev ? baseUrl : url}/${id}`, {
          data: { username: session?.user.name },
        })
        .then((res) => {
          res && toast.success("Deleted");
          router.push("/");
        });
    } catch (error) {
      error && toast.error("You can only delete your post!");
      // console.log(error);
      alert("you can only Delete your post!");
    }
  };

  useEffect(() => {}, []);

  // logic for updating a single post
  const handleupdate = async (id) => {
    // console.log(id);
    try {
      const dev = process.env.NODE_ENV !== "production";
      const res = await axios
        .put(`${dev ? baseUrl : url}/${id}`, {
          username: session?.user.name,
          title,
          desc,
          img,
          category,
          userimg: session?.user.image,
        })
        .then((res) => {
          res && toast.success("updated");
          setUpdateMode(false);
          router.push(`/product/${product._id}`);
        });
      // console.log(res);
    } catch (error) {
      toast.error(error);
      alert("You can only Edit your post!");
      // console.log(error);
    }
  };
  // logic for comments
  useEffect(() => {
    const id = `/product/${product._id}`;
    onSnapshot(
      query(collection(db, id, "comments"), orderBy("timestamp", "desc")),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    const id = `/product/${product._id}`;
    const docref = await addDoc(collection(db, id, "comments"), {
      comment: commentToSend,
      username: session?.user.name,
      userImage: session?.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const [hasLiked, setHasLiked] = useState(false);

  // animation variants for menu
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0.56,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className="mt-1 max-w-xs sm:max-w-xl md:max-w-2xl xl:w-5xl scrollbar-hide overflow-x-hidden sm:overflow-visible    text-white">
      {/* header */}

      <div className="flex items-center mr-12 p-5 ">
        <div className="  flex flex-1 items-center">
          <img
            className="rounded-full h-12 w-12 object-cover  pointer-events-none"
            src={product.userimg}
            alt=""
          />

          <p className="ml-3  capitalize font-normal truncate">
            {product.username}
          </p>
        </div>

        {session && (
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="menu"
          >
            <Menu className="relative" as="div">
              <>
                <motion.div
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.96 }}
                >
                  <Menu.Button className="flex flex-row items-center">
                    <EllipsisHorizontalIcon className=" flex space-x-2 h-8 w-8 ml-4 items-center animate-pulse text-[#ACe5ff]" />
                  </Menu.Button>
                </motion.div>

                <motion.ul
                  variants={{
                    open: { rotate: 360 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ originY: 0.56 }}
                  className="w-40 mx-auto fixed  rounded-lg"
                >
                  <motion.div
                    variants={{
                      open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                          type: "spring",
                          bounce: 0.8,
                          duration: 0.8,
                          delayChildren: 0.3,
                          staggerChildren: 0.05,
                        },
                      },
                      closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                          type: "spring",
                          bounce: 0.8,
                          duration: 0.4,
                        },
                      },
                    }}
                  >
                    <Menu.Items className="flex flex-col flex-grow-0 w-30 mr-8  sm:w-40 py-2 px-2 border border-gray-800  my-1 bg-black text-white te shadow-lg rounded-lg  ">
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            <div
                              onClick={() => setUpdateMode(true)}
                              className="flex flex-row items-center"
                            >
                              <PencilSquareIcon
                                className={`${
                                  active
                                    ? "  text-red-500 transition-all duration-150 ease-in h-4 w-4 cursor-pointer"
                                    : " text-gray-400 h-4 w-4 cursor-pointer"
                                }`}
                              />
                              <a
                                className={`${
                                  active
                                    ? " hover:text-red-400 rounded-md py-2 px-4 cursor-pointer transition duration-150 active:scale-90"
                                    : "  text-white px-4 py-1   cursor-pointer"
                                }`}
                                // href="/account-settings"
                              >
                                <motion.li variants={itemVariants}>
                                  {" "}
                                  Edit{" "}
                                </motion.li>
                              </a>
                            </div>
                          </>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center flex-row"
                          >
                            <TrashIcon
                              className={`${
                                active
                                  ? " text-red-500 transition-all duration-150 ease-in h-4 w-4 cursor-pointer"
                                  : " text-gray-400 h-4 w-4"
                              }`}
                            />
                            <a
                              onClick={notify}
                              className={`${
                                active
                                  ? "flex items-center space-x-2 text-red-500 transition-all duration-150 ease-in  py-2 px-4 cursor-pointer"
                                  : "  text-white rounded-md py-2 px-4 cursor-pointer"
                              }`}
                            >
                              <motion.li variants={itemVariants}>
                                {" "}
                                Delete{" "}
                              </motion.li>
                            </a>
                          </div>
                        )}
                      </Menu.Item>
                      {/* ... */}
                    </Menu.Items>
                  </motion.div>
                </motion.ul>
              </>
            </Menu>
          </motion.div>
        )}
      </div>

      {/* img */}
      {updateMode ? (
        <>
          <img
            className="object-cover w-52 h-52 rounded-md flex flex-col justify-center align-middle mx-auto  items-center"
            src={product.img}
            alt=""
          />
          <input
            value={`${product.img}`}
            onChange={(e) => setImg(`${product.img}`)}
            className=" bg-transparent border-1 py-2 px-4 border-b my-2 focus:ring-0 focus-within:outline-none w-full "
            type="text"
            placeholder={`${product.img}`}
          />
        </>
      ) : (
        <img
          className=" rounded-md pointer-events-none  object-contain w-[40rem] "
          src={product.img}
          alt=""
        />
      )}

      {/* Buttons */}

      {/* {session && ( */}
      {/* <div className=" flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className=" dark:text-red-500 btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <RiChat3Line className="h-7 w-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out" />
            <PaperAirplaneIcon className="btn rotate-90" />
          </div>

          <BookmarkIcon className="btn" />
        </div> */}
      {/* )} */}

      {/* caption */}

      {/* <p className=" p-5  truncate">
        {/* {session && ( */}
      {/* <p>
            {" "}
            {likes.length > 0 && (
              <p className=" font-semibold mb-1"> {likes.length} likes</p>
            )}
          </p> */}
      {/* )} } */}

      {updateMode ? (
        <input
          type="text"
          placeholder={product.title}
          value={title}
          className=" my-2  text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2 className="text-xl text-center my-2 max-w-xl sm:max-w-2xl ">
          {" "}
          {product.title}{" "}
        </h2>
      )}

      {updateMode ? (
        <>
          <ReactQuill
            modules={modules}
            theme="snow"
            placeholder="lets edit something"
            value={desc}
            onChange={setDesc}
          />
        </>
      ) : (
        <p className="text-base break-all my-4 max-w-xl sm:max-w-2xl ">
          {" "}
          {Parser(`${product.desc}`)}{" "}
        </p>
      )}

      {updateMode && (
        <div onClick={updated}>
          <button
            className="text-sm cursor-pointer py-2 px-4 rounded-lg bg-blue-400 text-white"
            onClick={() => handleupdate(product._id)}
          >
            {" "}
            Publish{" "}
          </button>
        </div>
      )}

      <div className=" max-h-20 bg-black text-white overflow-y-scroll  scrollbar-hide">
        {comments.map((comment) => (
          <div
            className=" flex items-center justify-start space-x-2 mb-3 "
            key={comment.id}
          >
            <img
              className=" pointer-events-none h-7 rounded-full "
              src={comment.data().userImage}
              alt=""
            />
            <p className=" text-xs sm:text-sm  flex-1 items-start break-all">
              <span className=" font-semibold">{comment.data().username} </span>
              {comment.data().comment}
            </p>

            <Moment className="hidden sm:pr-5 sm:text-sm " fromNow>
              {comment.data().timestamp?.toDate()}
            </Moment>
          </div>
        ))}
      </div>

      {/* input box */}

      {session && (
        <form className="flex items-center p-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border border-gray-800 bg-transparent rounded-full px-4 py-2 mr-2 flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className=" font-light text-blue-400"
          >
            Post
          </button>
        </form>
      )}

      <Modal />
    </div>
  );
}

export default Post;
