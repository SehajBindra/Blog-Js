import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ category }) {
  const { data: session } = useSession();
  //   console.log(category._id);

  //   console.log(session);
  //   const id = `${category._id}`;
  const [savePosts, setSavePosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "saved"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(savePosts);
  return (
    <div>
      {category.map((category) => (
        <h1 key={category._id}>{category._id}</h1>
      ))}
    </div>
  );
}

export default Savepost;
