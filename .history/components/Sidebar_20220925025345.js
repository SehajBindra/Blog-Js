import {
  BellIcon,
  BookmarkIcon,
  HashtagIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Currentuser, loginSuccess, logout } from "../redux/slices/userSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  //   const currentUser = useSelector(Currentuser);
  const dispatch = useDispatch();
  return (
    <div className="   border-r  sm:col-span-2 items-center px-4 md:col-span-2 lg:col-span-2 md:items-start   sm:inline-flex flex-col">
      <img
        className="hidden sm:inline-flex h-10 w-10 object cover"
        src="https://miro.medium.com/max/1400/1*b3qxB8ELI-kyQKztCsLwEQ.png"
        alt=""
      />

      <SidebarRow Icon={HomeIcon} title={"Home"} />
      <SidebarRow Icon={HashtagIcon} title={"Explore"} />
      <SidebarRow Icon={BellIcon} title={"Notifiactions"} />
      <SidebarRow Icon={MagnifyingGlassIcon} title={"Messages"} />
      <SidebarRow Icon={BookmarkIcon} title={"Bookmark"} />

      <SidebarRow
        onclick={dispatch(logout())}
        Icon={UserIcon}
        title={"Sign out"}
      />
    </div>
  );
}

export default Sidebar;
