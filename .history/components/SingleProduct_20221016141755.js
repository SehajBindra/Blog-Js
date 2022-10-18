import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Modal from "../components/Modal";
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

function Post({ product }) {
  const notify = () =>
    toast.success("Deleted", {
      duration: 2000,
    });
  const updated = () =>
    toast.success("Updated", {
      duration: 2000,
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

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const res = await axios
        .delete(`http://localhost:3000/api/products/${id}`, {
          data: { username: session?.user.name },
        })
        .then((res) => {
          res && toast.success("Deleted");
          router.push("/");
        });
    } catch (error) {
      error && toast.error("You can only delete your post!");
      // console.log(error);
      alert(error);
    }
  };

  const handleupdate = async (id) => {
    // console.log(id);
    try {
      const res = await axios
        .put(`http://localhost:3000/api/products/${id}`, {
          username: session?.user.name,
          title,
          desc,
          img,
          category,
          userimg: session?.user.image,
        })
        .then((res) => {
          toast.success("updated");
          setUpdateMode(false);
          router.push(`/product/${product.product._id}`);
        });
      // console.log(res);
    } catch (error) {
      toast.error("You can only Edit your post!");
      // console.log(error);
    }
  };

  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className=" my-7    rounded-sm">
      {/* header */}

      <div className="flex items-center mr-12 p-5 ">
        <div className="flex flex-1 items-center">
          <img
            className="rounded-full h-12 w-12 object-cover border p-1 mr-3 pointer-events-none"
            src={product.product.userimg}
            alt=""
          />

          <p className=" capitalize font-normal truncate">
            {product.product.username}
          </p>
        </div>

        {session && (
          <Menu as="div">
            {({ open }) => (
              <>
                <Menu.Button className="flex flex-row items-center text-gray-500">
                  <EllipsisHorizontalIcon className=" flex space-x-2 h-8 w-8 items-center" />
                </Menu.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  {open && (
                    <div className="w-40 mx-auto fixed  rounded-lg">
                      {/*
                Using the `static` prop, the `Menu.Items` are always
                rendered and the `open` state is ignored.
              */}
                      <Menu.Items
                        className="flex flex-col flex-grow-0 w-40 overflow-x-hidden sm:w-60 py-2 px-4 border  my-1 bg-white shadow-lg rounded-lg  "
                        as="div"
                      >
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
                                      : "bg-white  text-black px-4 py-1   cursor-pointer"
                                  }`}
                                  // href="/account-settings"
                                >
                                  Edit
                                </a>
                              </div>
                            </>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => handleDelete(product.product._id)}
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
                                    : "bg-white  flex items-center  text-black rounded-md py-2 px-4 cursor-pointer"
                                }`}
                              >
                                Delete
                              </a>
                            </div>
                          )}
                        </Menu.Item>
                        {/* ... */}
                      </Menu.Items>
                    </div>
                  )}
                </Transition>
              </>
            )}
          </Menu>
        )}
      </div>

      {/* img */}
      {updateMode ? (
        <>
          <img
            className="object-cover w-52 h-52 rounded-md flex flex-col justify-center  items-center"
            src={product.product.img}
            alt=""
          />
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className=" border-1 py-2 px-4 border-b my-2 focus:ring-0 focus-within:outline-none w-full "
            type="text"
            placeholder={`${product.product.img}`}
          />
        </>
      ) : (
        <img
          className=" rounded-md pointer-events-none  object-contain w-[40rem] "
          src={product.product.img}
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
          placeholder={product.product.title}
          value={title}
          className=" my-2  text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2 className="text-xl text-center my-2 max-w-2xl">
          {" "}
          {product.product.title}{" "}
        </h2>
      )}

      {updateMode ? (
        <textarea
          cols="30"
          rows="16"
          value={desc}
          placeholder={product.product.desc}
          onChange={(e) => setDesc(e.target.value)}
          className=" resize-none  text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
        ></textarea>
      ) : (
        <p className="text-base break-words my-4 max-w-2xl ">
          {" "}
          {product.product.desc}{" "}
        </p>
      )}

      {/* {updateMode ? (
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      ) : (
        <p className="text-base break-words my-4 max-w-2xl ">
          {" "}
          {categories?((category) => (
            <div key={category._id} product={product} />
          ))}
        </p>
      )} */}

      {/* comments */}
      {/* {session && (
        // {comments.length > 0 && (
        <div className="ml-5 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
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
              <p className=" text-sm  flex-1 items-start">
                <span className=" font-semibold">
                  {comment.data().username}{" "}
                </span>
                {comment.data().comment}
              </p>

              <Moment className=" pr-5 text-sm " fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )} */}

      {/* input box */}

      {session && (
        <form className="flex items-center p-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            //   onClick={sendComment}
            className=" font-light text-blue-400"
          >
            Post
          </button>
        </form>
      )}

      {updateMode && (
        <div onClick={updated}>
          <button
            className="text-sm cursor-pointer py-2 px-4 rounded-md border bg-blue-400 text-white"
            onClick={() => handleupdate(product.product._id)}
          >
            {" "}
            Published{" "}
          </button>
        </div>
      )}

      <Modal />
    </div>
  );
}

export default Post;
