import {
  BookmarkIcon,
  HashtagIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

import Modal from "./Modal";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, Setopen] = useRecoilState(modalState);

  return (
    <div className="    bg-black hidden sm:col-span-2 items-center px-4 md:col-span-2 lg:col-span-2 md:items-start   sm:inline-flex flex-col">
      <Image
        height={80}
        width={80}
        className="hidden mx-auto sm:inline-flex object cover"
        src="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        alt="Unknown.."
      />

      <SidebarRow
        onclick={() => router.push("/")}
        Icon={HomeIcon}
        title={"Home"}
      />

      {session && (
        <div
          onClick={() => Setopen(true)}
          className="flex flex-row items-center md:px-2   py-3 lg:px-4 rounded-full cursor-pointer"
        >
          <PencilSquareIcon className="h-7  text-[#E23E57]" />
          <h2 className=" text-base text-left hidden md:inline-flex  ml-2 lg:text-xl group-hover:text-twitter">
            {" "}
            Write
          </h2>
        </div>
      )}
      {session && (
        <SidebarRow
          onclick={() => router.push("/saved")}
          Icon={BookmarkIcon}
          title={"Saved"}
        />
      )}

      <SidebarRow
        onclick={() => router.push("/programing")}
        Icon={HashtagIcon}
        title={"Explore"}
      />
      <SidebarRow
        onclick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign out" : "Sign In"}
      />

      <Modal />
    </div>
  );
}

export default Sidebar;
