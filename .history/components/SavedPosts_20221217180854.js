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
import { toast } from "react-hot-toast";

function SavedPosts({ product }) {
  const { data: session } = useSession();
  // logic for saving a post in firbase
  const [saves, setSave] = useState([]);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const id = `${product._id}`;
    onSnapshot(collection(db, "product", id, "saved"), (snapshot) =>
      setSave(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasSaved(
      saves.findIndex((save) => save.id === session?.user?.name) !== -1
    );
  }, [saves]);

  // sending details to firebase
  const savePost = async () => {
    const id = `product/${product._id}`;
    if (hasSaved) {
      // await deleteDoc(doc(db, "product", id, "saved", session?.user?.name));

      toast.error("Remove from saved");
    } else {
      const docRef = await addDoc(collection(db, id, "saved"), {
        username: product.username,
        userImage: product.userimg,
        email: session?.user.email,
        title: product.title,
        img: product.img.toString(),
        id: product._id.toString(),
        timestamp: serverTimestamp(),
      });
      toast.success("saved");
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
                  className="w-5 h-5 text-red-400  hover:animate-bounce cursor-pointer"
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
