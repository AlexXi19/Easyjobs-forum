import React from "react";
import Nav from "./../components/layout/Nav.js"
import PostOverview from "./../components/PostOverview"
import {Grid,Image} from 'semantic-ui-react';
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
function Home(){
  const useStyles = makeStyles((theme) => ({
    root: {
     
    },
  }));
  const classes=useStyles();
  return(
    
    <div className={classes.root}>
   <Grid>
   <Grid.Column width={3}>
  
   </Grid.Column>
   <Grid.Column width={9}>
  <PostOverview userID={0}/>
  </Grid.Column>
  <Grid.Column width={4}>
  
  </Grid.Column>
  </Grid>
  </div>);
}
export default Home;
