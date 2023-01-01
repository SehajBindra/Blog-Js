import React from "react";

function SinglePost({ post }) {
  return (
    <div>
      <h2 className="text-white text-2xl">{post.title} </h2>
    </div>
  );
}

export default SinglePost;
