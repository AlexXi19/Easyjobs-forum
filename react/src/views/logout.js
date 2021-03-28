import React, { useContext, useEffect } from "react";
import * as Cookies from "js-cookie";
import { useHistory } from "react-router";
import {
  getSessionCookie,
  removeSessionCookie,
  SessionContext,
} from "../components/UserContext";

function LogoutHandler() {
  const history = useHistory();
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    removeSessionCookie();
    setSession(getSessionCookie());
    history.push("/login");
  }, []);

  return null;
}
export default LogoutHandler;
