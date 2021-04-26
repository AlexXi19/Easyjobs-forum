import React from "react";
import PostOverview from "./../components/PostOverview"
import {Grid,Image} from 'semantic-ui-react';
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import ProfileIntro from "./../components/ProfileIntro";

function Profile(){
    const { id } = useParams();
    return(
        <div>
   <Grid>
   <Grid.Column width={3}>
        <ProfileIntro/>
   </Grid.Column>
   <Grid.Column width={9}>
  <PostOverview userID={id} />
  </Grid.Column>
  <Grid.Column width={4}>
  
  </Grid.Column>
  </Grid>
  
        </div>
    )
   
}

export default Profile;