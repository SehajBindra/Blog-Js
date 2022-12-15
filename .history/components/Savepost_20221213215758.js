import React from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost() {
  const [saveposts, setSavePosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "product"), orderBy("timestamp", "title")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(saveposts);
  return <div>Savepost</div>;
}

export default Savepost;
