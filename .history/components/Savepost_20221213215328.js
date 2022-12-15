import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

function Savepost({ category }) {
  const [saveposts, setSavePosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const id = `${category._id}`;
    onSnapshot(
      query(
        collection(id, "saved", session?.user.name),
        orderBy("timestamp", "title")
      ),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [id]);

  console.log(saveposts);
  return <div>Savepost</div>;
}

export default Savepost;
