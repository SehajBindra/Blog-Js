import {
  BellIcon,
  BookmarkIcon,
  HashtagIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Currentuser, loginSuccess, logout } from "../redux/slices/userSlice";
import Modal from "./Modal";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, Setopen] = useRecoilState(modalState);

  return (
    <div className="border-x hidden sm:col-span-2 items-center px-4 md:col-span-2 lg:col-span-2 md:items-start   sm:inline-flex flex-col">
      <img
        className="hidden mx-4 sm:inline-flex h-20 w-20 object cover"
        src="https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-modern-abstract-3d-logo-png-image_771012.jpg"
        alt=""
      />

      <SidebarRow
        onclick={() => router.push("/")}
        Icon={HomeIcon}
        title={"Home"}
      />
      <SidebarRow Icon={HashtagIcon} title={"Explore"} />
      {session && (
        <div className="flex flex-row items-center  py-3 px-4 rounded-full cursor-pointer">
          <PencilSquareIcon onClick={() => Setopen(true)} className="h-7" />
          <p className=" text-base text-left hidden md:inline-flex  ml-2 lg:text-xl group-hover:text-twitter">
            {" "}
            Write
          </p>
        </div>
      )}

      <SidebarRow
        onclick={() => router.push("/saved")}
        Icon={BookmarkIcon}
        title={"Saved"}
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
