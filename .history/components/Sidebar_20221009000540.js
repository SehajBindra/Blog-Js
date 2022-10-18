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
      <SidebarRow
        onclick={() => router.push("/saved")}
        Icon={HashtagIcon}
        title={"Explore"}
      />
      <SidebarRow
        onClick={() => Setopen(true)}
        Icon={PencilSquareIcon}
        title={"Write"}
      />

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
    </div>
  );
}

export default Sidebar;
