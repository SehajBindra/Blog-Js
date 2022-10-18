import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const getPostState = atom({
  key: "getPostState",
  default: {},
});

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
});
