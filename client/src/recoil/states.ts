import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
//import { v1 } from "uuid";

const { persistAtom } = recoilPersist();

export const UserId = atom({
  key: `userId`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const ClientAddress = atom({
  key: "clientAddress",
  default: "",
});

export const RequestKey = atom({
  key: "requestKey",
  default: "",
});
