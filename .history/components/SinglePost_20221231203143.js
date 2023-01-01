import React from "react";

function SinglePost({ post }) {
  return (
    <div key={post._id.toString()}>
      <h2>{post.title}</h2>

      <h3>{post.desc}</h3>
    </div>
  );
}

export default SinglePost;
