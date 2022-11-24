import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import Modal from "../components/Modal";
import dynamic from "next/dynamic";
import Parser from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import {
  ChevronUpDownIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

const people = [
  { name: "Technology" },
  { name: "Programing" },
  { name: "Data Science" },
  { name: "Artificial Intelligence" },
  { name: "Entertainment" },
  { name: "Web-Development" },
  { name: "Gaming" },
  { name: "Sports" },
  { name: "crypto" },
  { name: "Stock market" },
  { name: "others" },
];

function Post({ product }) {
  // React quill
  // console.log(product);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [selectedPeople, setSelectedPeople] = useState([people[0]]);
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
          res && router.push("/");
          toast.success("Deleted");
        });
    } catch (error) {
      error && toast.error("You can only delete your post!");
      // console.log(error);
      // alert("you can only Delete your post!");
    }
  };

  useEffect(() => {
    const getpost = async (id) => {
      const id2 = `${product._id}`;
      const dev = process.env.NODE_ENV !== "production";
      const data = await axios.get(`${dev ? baseUrl : url}/${id2}`, {});
      setDesc(data.data.data.desc);
      setTitle(data.data.data.title);
      setImg(data.data.data.img);
    };
    getpost();
  }, []);

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
          category: selectedPeople,
          userimg: session?.user.image,
        })
        .then((res) => {
          setUpdateMode(false);
          router.push(`/product/${product._id}`);
          res && toast.success("updated");
        });
      // console.log(res);
    } catch (error) {
      error && toast.error("You can only Edit your post!");
      // alert("You can only Edit your post!");
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
          <Image
            height={24}
            width={24}
            className="rounded-full   object-cover  pointer-events-none"
            src={product.userimg}
            alt="unknown error"
          />

          <p className="ml-3  truncate capitalize font-normal ">
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

                              <motion.li
                                className={`${
                                  active
                                    ? " hover:text-red-400 rounded-md py-2 px-4 cursor-pointer transition duration-150 active:scale-90"
                                    : "  text-white px-4 py-1   cursor-pointer"
                                }`}
                                variants={itemVariants}
                              >
                                {" "}
                                Edit{" "}
                              </motion.li>
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

                            <motion.li
                              className={`${
                                active
                                  ? "flex items-center space-x-2 text-red-500 transition-all duration-150 ease-in  py-2 px-4 cursor-pointer"
                                  : "  text-white rounded-md py-2 px-4 cursor-pointer"
                              }`}
                              variants={itemVariants}
                            >
                              {" "}
                              Delete{" "}
                            </motion.li>
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
          <div className="flex justify-center items-center mx-auto">
            <Image
              width={208}
              height={208}
              className="object-cover  rounded-full   "
              src={product.img}
              alt="unknown error"
            />
          </div>

          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className=" bg-transparent border-1 py-2 px-4 border-b my-2 focus:ring-0 focus-within:outline-none w-full "
            type="text"
          />
        </>
      ) : (
        <Image
          width={640}
          height={400}
          className=" relative rounded-lg pointer-events-none  object-cover  "
          src={product.img}
          alt="use unsplash.com for image!"
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
          className=" my-2 sm:max-w-2xl text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <Fade cascade damping={1e-1}>
          <h2 className="text-xl font-semibold text-center my-2 max-w-xl sm:max-w-2xl ">
            {" "}
            {product.title}{" "}
          </h2>
        </Fade>
      )}

      {updateMode ? (
        <>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={desc}
            onChange={setDesc}
          />
        </>
      ) : (
        <p className="text-base my-4 max-w-xl sm:max-w-2xl ">
          {" "}
          {Parser(`${product.desc}`)}{" "}
        </p>
      )}

      {updateMode && (
        <Listbox
          className="bg-gray-100 rounded-md"
          value={selectedPeople}
          onChange={setSelectedPeople}
          multiple
        >
          {({ open }) => (
            <>
              <Listbox.Button className=" text-center bg-gray-100 text-black my-2 rounded-md py-2 px-4 flex flex-row items-center space-x-2 justify-center align-middle mx-auto  ">
                {selectedPeople.map((person) => person.name).join(", ")}
                <div className="flex flex-row items-center">
                  <ChevronUpDownIcon
                    className="h-5  w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="bg-gray-100 rounded-md py-1 px-4 my-2 h-32 overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg">
                  {people.map((person, i) => (
                    <Listbox.Option
                      key={i}
                      value={person}
                      className="active:bg-gray-100  my-2 rounded-sm  transition-all   flex flex-col justify-center align-middle mx-auto duration-200 active:text-black active:rounded-md  text-black"
                    >
                      <p className=" cursor-pointer"> {person.name} </p>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      )}

      {updateMode && (
        <div>
          <button
            className="text-sm cursor-pointer my-4 mx-auto  justify-items-center  py-2 px-4 flex flex-col  align-middle rounded-lg bg-blue-400 text-white"
            onClick={() => handleupdate(product._id)}
          >
            {" "}
            Publish{" "}
          </button>
        </div>
      )}

      {session && (
        <div className="ml-5 max-h-20 bg-black text-white overflow-y-scroll my-2  scrollbar-hide">
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
                <span className=" font-semibold">
                  {comment.data().username}{" "}
                </span>
                {comment.data().comment}
              </p>

              <Moment className="hidden sm:pr-5 sm:text-sm " fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}

      {session && (
        <form className="flex items-center my-5 p-4">
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
