import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function Post({ product }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className=" my-7  rounded-sm">
      {/* header */}

      <div className="flex items-center mr-12 p-5 ">
        <div className="flex flex-1 items-center">
          <img
            className="rounded-full h-12 w-12 object-cover border p-1 mr-3 pointer-events-none"
            src={product.product.userimg}
            alt=""
          />

          <p className=" capitalize font-normal">{product.product.username}</p>
        </div>

        <Menu as="div">
          {({ open }) => (
            <>
              <Menu.Button className="text-gray-500">
                <EllipsisHorizontalIcon className="h-8 w-8 items-center" />
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
                  <div className="w-56 fixed">
                    {/*
                Using the `static` prop, the `Menu.Items` are always
                rendered and the `open` state is ignored.
              */}
                    <Menu.Items
                      className="flex flex-col flex-grow-0 w-32 sm:w-56  py-2 px-4  my-1 bg-white shadow-lg rounded-md  "
                      as="div"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            <div className="flex flex-row">
                              <PencilSquareIcon
                                className={`${
                                  active
                                    ? " flex space-x-2 items-center text-red-500 transition-all duration-150 ease-in h-4 w-4 cursor-pointer"
                                    : " flex space-x-2 items-center text-gray-400 h-4 w-4"
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
                          <div className="flex items-center flex-row">
                            <TrashIcon
                              className={`${
                                active
                                  ? " text-red-500 transition-all duration-150 ease-in h-4 w-4 cursor-pointer"
                                  : " text-gray-400 h-4 w-4"
                              }`}
                            />
                            <a
                              className={`${
                                active
                                  ? "flex items-center space-x-2 text-red-500 transition-all duration-150 ease-in  py-2 px-4 cursor-pointer"
                                  : "bg-white  flex items-center  text-black rounded-md py-2 px-4 cursor-pointer"
                              }`}
                              // href="/account-settings"
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
      </div>

      {/* img */}
      <img
        className=" rounded-md pointer-events-none object-cover w-[40rem] "
        src={product.product.img}
        alt=""
      />

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

      <h2 className="text-xl text-center my-2"> {product.product.title} </h2>

      <p className="text-base break-words my-4 max-w-2xl ">
        {" "}
        {product.product.desc}{" "}
      </p>

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
      {/* {session && ( */}
      <form className="flex items-center p-4">
        {/* <EmojiHappyIcon className="btn" /> */}
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
      {/* )} */}
    </div>
  );
}

export default Post;
