import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Savepost() {
  const { data: session } = useSession();
  const [saveposts, setSavePosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "saved", `${session?.user.name}`),
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
