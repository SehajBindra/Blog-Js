import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";

function Modal() {
  const [open, Setopen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    {
      Setopen(false);
      setLoading(false);
      setSelectedfile(null);
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
            <div className=" inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:py-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
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
                    <CameraIcon className=" h-6 w-6 text-purple-600" />
                    {/* <CameraIcon
                      className=" h-6 w-6 text-red-600"
                      aria-hidden="true"
                    /> */}
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload a Photo
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
                      className=" border-none focus:ring-0 focus-within:outline-none w-full text-center"
                      type="text"
                      placeholder="Title"
                      //   ref={captionRef}
                    />
                  </div>
                  <p>Description:</p>
                  <div className="mt-2">
                    <textarea
                      className=" resize-none rounded-lg focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500 w-full border-2 border-[#ff2369] bg-transparent"
                      cols="4"
                      rows="4"
                    ></textarea>
                    {/* <input
                     
                      type="text"
                      placeholder="description"
                      //   ref={captionRef}
                    /> */}
                  </div>

                  <div className="mt-2">
                    <input
                      className=" border-none focus:ring-0 focus-within:outline-none w-full text-center"
                      type="text"
                      placeholder="Img url"
                      //   ref={captionRef}
                    />
                  </div>
                </div>
                <div className="mt-5  sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedfile}
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
