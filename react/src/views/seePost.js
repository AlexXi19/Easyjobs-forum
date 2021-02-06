import React from "react";
import Nav from "./../components/layout/NavBar.js"
import PostDetail from "./../components/PostDetail.js"
import Comments from "../components/Comments.js"
import {Grid,Image} from 'semantic-ui-react'

function Post(){

  return  <div>
  <Nav />
 <Grid>
 <Grid.Column width={3}>

 </Grid.Column>
 <Grid.Column width={9}>
<PostDetail/>
<Comments />
</Grid.Column>
<Grid.Column width={4}>

</Grid.Column>
</Grid>
</div>
}
export default Post;
