import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ category }) {
  const { data: session } = useSession();
  //   console.log(category._id);
  //   console.log(category);

  //   console.log(session);

  const [savePosts, setSavePosts] = useState([]);
  const id = `${category._id}`;
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "product", "saved", id),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db, category]);

  console.log(savePosts);
  return (
    <div>
      {savePosts.map((posts) => (
        <div key={posts.id}>
          <h2>{posts.data().username} </h2>
          <h2> {posts.data().title}</h2>
          {/* userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().captionRef} */}
        </div>
      ))}
    </div>
  );
}

export default Savepost;
