import {
  doc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  setDoc,
  addDoc,
} from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { BookmarkSlashIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function SavedPosts({ product }) {
  const { data: session } = useSession();
  // logic for saving a post in firbase
  const [saves, setSave] = useState([]);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const id = `/product/${product._id}`;
    onSnapshot(collection(db, id, "saved"), (snapshot) =>
      setSave(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasSaved(
      saves.findIndex((save) => save.id === session?.user?.name) !== -1
    );
  }, [saves]);

  const savePost = async () => {
    const id = `/product/${product._id}`;
    if (hasSaved) {
      await deleteDoc(doc(db, id, "saved", session?.user.name));
    } else {
      const docRef = await addDoc(doc(db, id, "saved", session?.user.name), {
        username: session?.user.name,
        userImage: session?.user.image,
        email: session?.user.email,
        title: product.title,
        img: product.img,
        id: product._id,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <div>
      {session && (
        <>
          <div className=" transition duration-150  active:scale-90 ml-4 flex justify-between items-center ">
            <div className="flex   items-center ">
              {hasSaved ? (
                <BookmarkSlashIcon
                  onClick={savePost}
                  className=" h-5 w-5 text-red-500   cursor-pointer"
                />
              ) : (
                <BookmarkIcon
                  onClick={savePost}
                  className="w-5 h-5 text-red-400  animate-bounce cursor-pointer"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SavedPosts;
