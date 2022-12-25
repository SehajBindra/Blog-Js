import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({  }) {
  const { data: session } = useSession();
  //   console.log(category._id);
  console.log(product);

  //   console.log(session);

  const [savePosts, setSavePosts] = useState([]);

  useEffect(() => {
    // const id = `${product._id}`;
    onSnapshot(
      query(collection(db, "post", "saved"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(savePosts);
  return <div>save posts</div>;
}

export default Savepost;