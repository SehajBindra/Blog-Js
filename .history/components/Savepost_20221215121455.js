import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ product }) {
  const { data: session } = useSession();
  //   console.log(category._id);

  //   console.log(session);

  const [savePosts, setSavePosts] = useState([product]);
  const id = `${product._id}`;
  useEffect(() => {
    onSnapshot(
      query(collection(db, "post", id, "saved"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db, product, id]);

  console.log(savePosts);
  return <div>save posts</div>;
}

export default Savepost;
