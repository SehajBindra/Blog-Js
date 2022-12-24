import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Saved from "./Saved";

function Savepost({ category }) {
  //   console.log(category._id);
  //   console.log(category);

  //   console.log(session);

  const [savePosts, setSavePosts] = useState([]);

  useEffect(() => {
    const id = `product/${category._id}`;
    // console.log(`${category._id}`);
    onSnapshot(
      query(collection(db, id, "saved"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db]);

  //   console.log(savePosts);
  console.log();

  return (
    <div>
      {savePosts.map((posts) => (
        <Saved
          key={posts.data().id}
          id={posts.data().id.toString()}
          username={posts.data().username}
          userImg={posts.data().userImage}
          img={posts.data().img}
          title={posts.data().title}
        />
      ))}
    </div>
  );
}

export default Savepost;
