import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

function Savepost() {
  const [saveposts, setSavePosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    onSnapshot(
      query(
        collection("product", "saved", session?.user.name),
        orderBy("timestamp", "title")
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
