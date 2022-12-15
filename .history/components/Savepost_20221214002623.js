import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ category }) {
  const { data: session } = useSession();
  console.log(category);

  console.log(session)
  const id = `/product/${category._id}`;
  const [saveposts, setSavePosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, id, "saved", session?.user.name),
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
