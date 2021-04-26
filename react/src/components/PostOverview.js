import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { cardTitle } from "../assets/jss/material-kit-react";
import CommentIcon from "@material-ui/icons/Comment";
import Link from "@material-ui/core/Link";
import PostEntry from "./PostEntry.js";
import Axios from "axios";

export default function RecipeReviewCard(props) {
  console.log("IDDDDD is "+props.userID);
  console.log("Getting All Posts");
 
  const [posts, setPosts] = useState([]);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [identity,setID]=useState(props.id);
  
  useEffect(() => {
    if (props.userID!=0){
     
    Axios.get("http://localhost:5000/getAllPostsByUser/"+props.id).then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log("Could not get posts");
        console.log(error);
      }
    );
  }
  else{
  Axios.get("http://localhost:5000/getAllPosts").then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log("Could not get posts");
        console.log(error);
      }
    );}
}, []);


  return (
    <div>
      {posts.map((post) => (
        <PostEntry
          key={post._id}
          id={post._id}
          //icon={post.icon}
          icon="🤣"
          content={post.content.substring(0, 250) + "......"}
          title={post.title}
          date={new Date(post.date).toLocaleDateString(undefined, options)}
          //name={post.name}
        />
      ))}
    </div>
  );
}
