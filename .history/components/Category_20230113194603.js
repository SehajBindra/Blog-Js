import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Zoom = dynamic(() => import("react-awesome-reveal"));
import React from "react";
// import { Zoom } from "react-awesome-reveal";
const Moment = dynamic(() => import("react-moment"));
// import Moment from "react-moment";

function Category({ category }) {
  const router = useRouter();
  return (
    <div>
      <Zoom>
        <div
          onClick={() => router.push(`/blog/${category.slug}`)}
          key={category._id}
          className="flex flex-row bg-black text-white overflow-y-scroll h-screen    justify-center align-middle cursor-pointer  items-center sm:flex-row py-4 px-8 sm:pr-4 pr-2 "
        >
          <div className=" my-4  flex-shrink-0  sm:my-8">
            <Image
              height={120}
              width={120}
              className="image"
              src={category.img}
              alt="something went wrong"
            />
          </div>

          <div className="flex flex-col  pl-4">
            <h2 className="text-base max-w-[10rem] tracking-normal leading-relaxed sm:text-lg  font-semibold sm:max-w-xs  md:max-w-sm line-clamp-2  mt-2 ">
              {category.title}{" "}
            </h2>

            <div className="flex items-center space-x-2 my-2">
              <Image
                height={24}
                width={24}
                className="rounded-full  pointer-events-none  p-1 object-cover"
                src={category.userimg}
                alt="something went wrong"
              />
              <h3 className="flex-1 whitespace-nowrap text-sm sm:text-base">
                {category.username}
              </h3>
            </div>

            <div className="flex justify-between items-center">
              <Moment
                className="flex-1 moment ml-2 my-1  pr-5  "
                format="D MMM YYYY"
              >
                {category.createdAt}
              </Moment>

              <div className="flex flex-row space-x-2 items-center cursor-pointer">
                <h4 className="text-sm sm:text-base">Read more</h4>
                <ArrowUpRightIcon className="arrow mr-4  animate-none" />
              </div>
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
}

export default Category;
