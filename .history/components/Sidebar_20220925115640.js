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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Currentuser, loginSuccess, logout } from "../redux/slices/userSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="border-r hidden sm:col-span-2 items-center px-4 md:col-span-2 lg:col-span-2 md:items-start   sm:inline-flex flex-col">
      <img
        className="hidden sm:inline-flex h-10 w-10 object cover"
        src="https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-modern-abstract-3d-logo-png-image_771012.jpg"
        alt=""
      />

      <SidebarRow Icon={HomeIcon} title={"Home"} />
      <SidebarRow Icon={HashtagIcon} title={"Explore"} />
      <SidebarRow Icon={PencilSquareIcon} title={"Write"} />
      <SidebarRow Icon={MagnifyingGlassIcon} title={"Messages"} />
      <SidebarRow Icon={BookmarkIcon} title={"Saved"} />

      <SidebarRow
        onclick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign out" : "Sign In"}
      />
    </div>
  );
}

export default Sidebar;
