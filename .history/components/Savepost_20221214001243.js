import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ category }) {
  const { data: session } = useSession();
  console.log(category);
  const [saveposts, setSavePosts] = useState([]);
  useEffect(() => {
    const id = `/product/${category._id}`;
    onSnapshot(
      query(
        collection(db, "posts", "saved", id, session?.user.name),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(saveposts);
  return <div>Savepost</div>;
}

export default Savepost;
