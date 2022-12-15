import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ category }) {
  const { data: session } = useSession();
  //   console.log(category._id);
  console.log(category);

  //   console.log(session);

  const [savePosts, setSavePosts] = useState([]);
  const id = `${category._id}`;
  useEffect(() => {
    onSnapshot(
      query(collection(db, "post", id, "saved"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db, category]);

  console.log(savePosts);
  return <div>save posts</div>;
}

export default Savepost;
