import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Saved from "./Saved";
import { useSelector } from "react-redux";
import { selectItems } from "./../redux/slices/SavedSlice";

function Savepost({ category }) {
  //   console.log(category._id);
  //   console.log(category);

  //   console.log(session);

  const items = useSelector(selectItems);
  const [savePosts, setSavePosts] = useState([items]);
  // useEffect(() => {
  //   const id = `product/${category._id}`;
  //   // console.log(`${category._id}`);
  //   onSnapshot(
  //     query(collection(db, id, "saved"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setSavePosts(snapshot.docs);
  //     }
  //   );
  // }, [db]);

  //   console.log(savePosts);
  console.log();

  return (
    <div>
      {items.map((item) => (
        <Saved
          key={i}
          id={item.id.toString()}
          username={item.username}
          userImg={item.userimage}
          img={item.img}
          title={item.title}
        />
      ))}
    </div>
  );
}

export default Savepost;
