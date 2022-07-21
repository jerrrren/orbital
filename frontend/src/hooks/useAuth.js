import create from "zustand";

import { saveToken, deleteToken, getAuth, getUid } from "../utils/auth";
import session, { SessionStorageKey } from "../utils/sessionStorage";
import { ROLE } from "../constants/roles";

const useAuth = create((set) => ({
  isAuth: getAuth(),
  uid: getUid(),

  userLogin: (token, uid) => {
    saveToken(token, ROLE.User, uid);
    session.removeItem(SessionStorageKey.sessionTimedOut);
    set({ isAuth: getAuth() });
    set({ uid: getUid() });
  },

  logout: () => {
    deleteToken();
    set({ isAuth: getAuth() });
    set({ uid: getUid() });
  },
}));

export default useAuth;
