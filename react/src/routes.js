import React from "react";
// import AddPost from "./views/addPost";
// import Followed from "./views/followed";
// import Home from "./views/home";
import Login from "./views/login";
// import Profile from "./views/profiles";
import SeePost from "./views/seePost";
//
function Routes(props){
return   ([
  {
    path:"/",
    component:Login
  },
  {
    path:"/seePost",
    component:SeePost
  }
]);
}

export default Routes;
