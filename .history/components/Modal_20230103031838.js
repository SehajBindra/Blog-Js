import React, { Fragment, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { CameraIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

import { Listbox } from "@headlessui/react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";

import axios from "axios";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const people = [
  { name: "Technology" },
  { name: "Programing" },
  { name: "React js" },
  { name: "Data Science" },
  { name: "Web-Development" },
  { name: "Artificial Intelligence" },
  { name: "Entertainment" },
  { name: "Gaming" },
  { name: "Sports" },
  { name: "crypto" },
  { name: "Stock market" },
  { name: "others" },
];
const baseUrl = "http://localhost:3000/api/products";
const url = "https://blog-beta-hazel.vercel.app/api/products";

function Modal() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],

      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const { data: session, status } = useSession();
  const [selectedPeople, setSelectedPeople] = useState([people[0]]);

  const [open, Setopen] = useRecoilState(modalState);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
    },
  };

  const uploadPost = async (e) => {
    if (loading) return;
    setLoading(true);

    try {
      const dev = process.env.NODE_ENV !== "production";

      const res = await axios
        .post(`${dev ? baseUrl : url}`, {
          title,
          desc,
          img,
          slug: slug,
          // .split(" ")
          // .join("-")
          // .toLowerCase("")
          // .replace(
          //   /[,\,!,%,<,>,@,$,&,:,;,|,/,#,^,*,(,), ?]+|[,\,!,%,?]+/g,
          //   ""
          // ),
          category: selectedPeople,
          username: session?.user.name,
          userimg: session?.user.image,
        })
        .then((res) => {
          router.push("/");
          toast.success("Posted!");
        });

      // console.log(res);

      setTitle("");
      setDesc("");
      setImg("");

      Setopen(false);
      setLoading(false);
      setSelectedfile(null);
    } catch (error) {
      alert(error);
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
        <div className=" flex items-end justify-center  min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-black text-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:py-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
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
                    className=" mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-black cursor-pointer"
                  >
                    <CameraIcon className=" h-6 w-6 text-red-400" />
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 border-b py-4 px-8 sm:px-2  border-gray-600 text-white"
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
                      className="input"
                      type="text"
                      placeholder="Title"
                      //   ref={captionRef}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="input"
                      type="text"
                      placeholder="slug"
                      //   ref={captionRef}
                    />

                    <p className="text-sm text-gray-500 line-clamp-2">
                      Note: Slug should be small and descriptive for ex:
                      what-is-ai
                    </p>
                  </div>

                  <div className="mt-2 ">
                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      placeholder={`Hey ${session?.user.name}`}
                      value={desc}
                      onChange={setDesc}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      className=" input "
                      type="text"
                      placeholder="Img Url"
                    />
                  </div>
                </div>
                <h2 className="input border-none my-2">
                  Select the Category below :
                </h2>
                <Listbox
                  className="bg-gray-100 rounded-md"
                  value={selectedPeople}
                  onChange={setSelectedPeople}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button className=" text-center text-black bg-gray-100 rounded-md py-2 px-8 flex flex-row items-center space-x-2 justify-center align-middle mx-auto  ">
                        {selectedPeople.name}
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
                        <Listbox.Options className="bg-gray-100 text-black rounded-md py-1 px-4 my-2 max-h-[4.4rem] overflow-y-scroll scrollbar-hide">
                          {people.map((person, i) => (
                            <Listbox.Option
                              key={i}
                              value={person}
                              className="active:bg-gray-100  text-black my-2 rounded-sm  transition-all   flex flex-col justify-center align-middle mx-auto duration-200 active:text-black active:rounded-md  "
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
                    disabled={!img || !title || !desc || !selectedPeople}
                    onClick={uploadPost}
                    className=" inline-flex  justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 font-medium text-base text-white   focus:outline-none  sm:text-sm disabled:bg-gray-600 disabled:cursor-not-allowed hover:disabled:bg-gray-600"
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
