import React from "react";
import Cookies from "js-cookie";

export const removeSessionCookie = () => {
  Cookies.remove("session");
};

export function setSessionCookie(session) {
  Cookies.remove("session");
  //Cookies.set("session", session, { expires: 14 });
  Cookies.set("session", session);
}

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    console.log("Session: ");
    console.log(sessionCookie);
    return JSON.parse(sessionCookie);
  }
};

export const SessionContext = React.createContext(getSessionCookie());
