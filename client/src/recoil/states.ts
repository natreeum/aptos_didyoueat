import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist();

export const UserId = atom({
  key: `userId/${v1()}`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const ClientAddress = atom({
  key: `clientAddress/${v1()}`,
  default: "",
});

export const RequestKey = atom({
  key: `requestKey/${v1()}`,
  default: "",
});

export const AccessToken = atom({
  key: `accessToken/${v1()}`,
  default: "",
});
export const AdminEmail = atom({
  key: `adminEmail/${v1()}`,
  default: "",
});
