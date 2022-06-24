import session, { SessionStorageKey } from "./sessionStorage";

export const getToken = () => {
  const access = session.getItem(SessionStorageKey.access);
  const refresh = session.getItem(SessionStorageKey.refresh);
  const authType = session.getItem(SessionStorageKey.authType);

  if (access && refresh) return { access, refresh, authType };
};

export const getAuth = () => {
  const authType = session.getItem(SessionStorageKey.authType);
  if (authType) return authType;
};

export const getUid = () => {
  const uid = session.getItem("uid");
  return uid;
};

export const saveToken = (token, authType, uid) => {
  session.setItem(SessionStorageKey.access, token.access);
  session.setItem(SessionStorageKey.refresh, token.refresh);
  session.setItem(SessionStorageKey.authType, authType);
  session.setItem("uid", uid);
};

export const deleteToken = () => {
  session.removeAllItems();
};
