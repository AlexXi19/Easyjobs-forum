import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: 400,
    margin: "1%",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    padding: "0% 3%",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = useState({});
  const [isLiked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function likePost() {
    // CHANGES THIS LATER, CURRENTLY IT ONLY LIKES THE BUTTON
    if (!isLiked) {
      setLiked(!isLiked);

      console.log("Liking Post " + props.id);

      let data = {
        postID: props.id,

      };

      Axios.post("http://localhost:5000/addLike", data).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  useEffect(() => {
    console.log("Finding User for post.");

    Axios.get("http://localhost:5000/getUserByPost/" + props.id).then(
      (response) => {
        setUser(response.data);
        console.log(response.data);
      },
      (error) => {
        console.log("Could not get User");
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <Link to={"/Posts/" + props.id}>
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.small}>
                  {props.icon}
                </Avatar>
              }
              titleTypographyProps={{ variant: "subtitle2" }}
              title={user.firstName + " " + user.lastName}
              subheader={props.date}
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="h3">
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <IconButton aria-label="Like">
          <FavoriteIcon
            onClick={likePost}
            color={isLiked ? "secondary" : "inherit"}
          />
        </IconButton>
        <IconButton aria-label="Comment">
          <CommentIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </Card>
    </div>
  );
}
