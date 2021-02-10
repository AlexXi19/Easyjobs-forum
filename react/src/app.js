import React from "react";
import "./styles.css";
import routes from "./routes";
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/layout/Nav';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import AddPost from "./views/addPost";
// import Followed from "./views/followed";
import Home from "./views/home";
import Login from "./views/loggin";
// import Profile from "./views/profiles";
import SeePost from "./views/seePost";

export default function App(){
return(
  <div className="wrapper">
     <h1>Easyjobs</h1>
  <Nav/>
     <Router>
         {/* <Link to="/">Home</Link>
         <Link to="/Posts">Posts</Link>
         <Link to="/Login"> Login</Link> */}
         <Route exact path="/" component={Home} />
         <Route exact path="/Posts" component={SeePost} />
         <Route path="/Login" component={Login} />

         
     </Router>
     
   </div>
    )
};
