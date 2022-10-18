import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Currentuser } from "../redux/slices/userSlice";
import axios from "axios";
import {
  currentPost,
  FetchFaliure,
  FetchStart,
  FetchSuccess,
} from "../redux/slices/postSlice";

import Router, { useRouter } from "next/router";

function Modal() {
  const CurrentPost = useSelector(currentPost);
  const currentUser = useSelector(Currentuser);
  //   console.log(currentUser.data.data.username);
  const dispatch = useDispatch();
  const [open, Setopen] = useRecoilState(modalState);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async (e) => {
    if (loading) return;
    setLoading(true);
    dispatch(FetchStart());

    try {
      const res = await axios
        .post("http://localhost:3000/api/products", {
          title,
          desc,
          img,
          username: currentUser.data.data.username,
        })
        .then((res) => {
          router.push("/");
          dispatch(FetchSuccess(res));
        });

      console.log(res);

      setTitle("");
      setDesc("");
      setImg("");
      setDate("");

      Setopen(false);
      setLoading(false);
      setSelectedfile(null);
    } catch (error) {
      dispatch(FetchFaliure());
    }
  };
  const [selectedfile, setSelectedfile] = useState(null);
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedfile(readerEvent.target.result);
    };
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className=" fixed z-10 inset-0 overflow-y-auto"
        onClose={Setopen}
      >
        <div className=" flex items-end justify-center min-h-[600px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter=" ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* this element is to trick the browser into centring the modal contents */}
          <span
            className=" hidden sm:inline-block  sm:align-middle  sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter=" ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:py-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedfile ? (
                  <img
                    className=" w-full object-contain cursor-pointer"
                    src={selectedfile}
                    onClick={() => setSelectedfile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className=" mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white cursor-pointer"
                  >
                    <CameraIcon className=" h-6 w-6 text-purple-600" />
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 border-b py-4 px-2 border-1  text-gray-800"
                  >
                    Create a Post
                  </Dialog.Title>

                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="  focus:ring-0 border-b my-2 border-1 focus-within:outline-none w-full text-center"
                      type="text"
                      placeholder="Title"
                      //   ref={captionRef}
                    />
                  </div>
                  {/* <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="created-at"
                    className=" resize-none rounded-lg focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500 w-full border-2 border-[#ff2369] bg-transparent"
                    type="text"
                  /> */}

                  <div className="mt-2">
                    <textarea
                      value={desc}
                      placeholder={`Hey ${currentUser.data.data.username}`}
                      onChange={(e) => setDesc(e.target.value)}
                      className=" resize-none  text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
                    ></textarea>
                    {/* <input
                     
                      type="text"
                      placeholder="description"
                      //   ref={captionRef}
                    /> */}
                  </div>

                  <div className="mt-2">
                    <input
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      className=" border-1 border-b my-2 focus:ring-0 focus-within:outline-none w-full text-center"
                      type="text"
                      placeholder="Img Url"
                      //   ref={captionRef}
                    />
                  </div>
                </div>
                <div className="mt-5  sm:mt-6">
                  <button
                    type="button"
                    disabled={!title}
                    onClick={uploadPost}
                    className=" inline-flex  justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 font-medium text-base text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {loading ? "Uploading..." : " Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
