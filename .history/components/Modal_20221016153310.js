import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import {
  CameraIcon,
  ChevronUpDownIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import { Listbox } from "@headlessui/react";

import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";
import { useDispatch, useSelector, useStore } from "react-redux";

import axios from "axios";
import {
  currentPost,
  FetchFaliure,
  FetchStart,
  FetchSuccess,
} from "../redux/slices/postSlice";

import Router, { useRouter } from "next/router";
import { User } from "../redux/slices/userSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
const people = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Art & Entertainment" },
  { id: 4, name: "Science" },
  { id: 5, name: "others" },
  { id: 6, name: "crypto" },
  { id: 7, name: "Business" },
  { id: 8, name: "Stock market" },
];

function Modal() {
  const { data: session, status } = useSession();
  const [selectedPeople, setSelectedPeople] = useState([people[0]]);

  const dispatch = useDispatch();
  const [open, Setopen] = useRecoilState(modalState);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();

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
          category: selectedPeople,
          username: session?.user.name,
          userimg: session?.user.image,
        })
        .then((res) => {
          router.push("/");
          toast.success("Posted!");
          dispatch(FetchSuccess(res));
        });

      console.log(res);

      setTitle("");
      setDesc("");
      setImg("");

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
        <div className=" flex items-end justify-center  min-h-[700px] sm:min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
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

                  <div className="mt-2">
                    <textarea
                      value={desc}
                      placeholder={`Hey ${session?.user.name}`}
                      onChange={(e) => setDesc(e.target.value)}
                      className=" resize-none  text-center focus-within:outline-none  w-full border-1 border-b bg-transparent"
                    ></textarea>
                  </div>

                  <div className="mt-2">
                    <input
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      className=" border-1 py-2 px-4 border-b my-2 focus:ring-0 focus-within:outline-none w-full text-center"
                      type="text"
                      placeholder="Img Url"
                    />
                  </div>
                </div>
                <Listbox
                  className="bg-gray-100 rounded-md"
                  value={selectedPeople}
                  onChange={setSelectedPeople}
                  by="id"
                  multiple
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button className=" text-center bg-gray-100 rounded-md py-2 px-4 flex flex-row items-center space-x-2 justify-center align-middle mx-auto  ">
                        {selectedPeople.map((person) => person.name).join(", ")}
                        <div className="flex flex-row items-center">
                          <ChevronUpDownIcon
                            className="h-5  w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="bg-gray-100 rounded-md py-1 px-4 my-2 max-h-[4rem] overflow-y-scroll scrollbar-hide">
                          {people.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              value={person}
                              className="active:bg-gray-100  my-2 rounded-sm  transition-all   flex flex-col justify-center align-middle mx-auto duration-200 active:text-black active:rounded-md  text-black"
                            >
                              <p className=" cursor-pointer"> {person.name} </p>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </>
                  )}
                </Listbox>

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
