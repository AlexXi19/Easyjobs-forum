import React, { useState, useEffect } from "react";
import "./styles.css";

import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/layout/Nav";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
// import AddPost from "./views/addPost";
// import Followed from "./views/followed";
import Home from "./views/home";
import Login from "./views/loggin";
// import Profile from "./views/profiles";
import SeePost from "./views/seePost";
import addPost from "./views/addPost";
import UserContext, {
  getSessionCookie,
  SessionContext,
} from "./components/UserContext";
import LogoutHandler from "./views/logout";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <div className="wrapper">
        <h1>Easyjobs</h1>
        <Nav />
        <Router>
          {/* <Link to="/">Home</Link>
         <Link to="/Posts">Posts</Link>
         <Link to="/Login"> Login</Link> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/Posts/:id" component={SeePost} />
          <Route path="/Login" component={Login} />
          <Route path="/addPost" component={addPost} />
          <Route path="/logout" component={LogoutHandler} />
        </Router>
      </div>
    </SessionContext.Provider>
  );
}
