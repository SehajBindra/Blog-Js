import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Zoom } from "react-awesome-reveal";
import Moment from "react-moment";

function Technology({ tech }) {
  return (
    <div>
      <div
        key={tech._id}
        className="flex flex-row bg-black    justify-center align-middle cursor-pointer  items-center sm:flex-row py-8 px-8 sm:pr-4 pr-2 "
      >
        <Zoom>
          <Link href={`/product/${tech._id}`}>
            <div className=" my-4  flex-shrink-0  sm:my-8">
              <Image
                height={120}
                width={120}
                className="image"
                src={tech.img}
                alt="something went wrong"
              />
            </div>
          </Link>

          <div className="flex flex-col  pl-4">
            <h2 className="text-base max-w-[10rem] tracking-normal leading-relaxed sm:text-lg  font-semibold sm:max-w-xs  md:max-w-sm line-clamp-2  mt-2 ">
              {tech.title}{" "}
            </h2>

            <div className="flex items-center space-x-2 my-2">
              <Image
                height={24}
                width={24}
                className="rounded-full  pointer-events-none  p-1 object-cover"
                src={tech.userimg}
                alt="something went wrong"
              />
              <h3 className="flex-1 whitespace-nowrap text-sm sm:text-base">
                {tech.username}
              </h3>
            </div>

            <div className="flex justify-between items-center">
              <Moment
                className="flex-1 text-gray-300 font-extralight ml-2 my-1 truncate pr-5 text-sm sm:text-sm "
                fromNow
              >
                {tech.createdAt}
              </Moment>

              <Link href={`/product/${tech._id}`}>
                <div className="flex flex-row space-x-2 items-center cursor-pointer">
                  <h4 className="text-sm sm:text-base">Read more</h4>
                  <ArrowLongRightIcon className="arrow mr-4 animate-pulse" />
                </div>
              </Link>
            </div>
          </div>
        </Zoom>
      </div>
    </div>
  );
}

export default Technology;
