import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost({ product }) {
  const { data: session } = useSession();

  //   console.log(category._id);

  //   console.log(session);
 
  const [savePosts, setSavePosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "post",  "saved" , session.user.name), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSavePosts(snapshot.docs);
      }
    );
  }, [db, id]);

  console.log(savePosts);
  return <div></div>;
}

export default Savepost;
