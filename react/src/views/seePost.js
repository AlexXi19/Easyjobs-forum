import React from "react";
import Nav from "./../components/layout/NavBar.js"
import PostDetail from "./../components/PostDetail.js"
import Comments from "../components/Comments.js"

function Post(){

  return  <div>
  <Nav />
<PostDetail/>
<Comments/>
</div>
}
export default Post;
