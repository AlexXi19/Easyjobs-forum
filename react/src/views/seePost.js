import React from "react";
import PostDetail from "./../components/PostDetail.js"
import Comments from "../components/Comments.js"
import {Grid,Image} from 'semantic-ui-react'

function Post(){

  return  <div>
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
