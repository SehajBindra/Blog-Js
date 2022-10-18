import React, { useEffect, useState } from "react";

function Post({ product }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className=" my-7  rounded-sm">
      {/* header */}
      <h2 className="text-xl mx-2"> {product.product.title} </h2>
      <div className="flex items-center ml-4 p-5 ">
        <img
          className="rounded-full h-12 w-12 object-cover border p-1 mr-3 pointer-events-none"
          src={product.product.img}
          alt=""
        />

        <p className=" capitalize font-normal">{product.product.username}</p>
        {/* <DotsHorizontalIcon className="h-5" /> */}
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

      <p className="text-lg break-words my-4 max-w-2xl ">
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
