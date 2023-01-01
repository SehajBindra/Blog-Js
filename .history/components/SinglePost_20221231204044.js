import React from "react";

function SinglePost({ post }) {
  return (
    <div key={post._id.toString()}>
      <h2>{post.title}</h2>

      <img src={post.img} alt="" />
    </div>
  );
}

export default SinglePost;
