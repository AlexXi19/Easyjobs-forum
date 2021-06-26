import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles,createMuiTheme } from "@material-ui/core/styles";
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
import LikeButton from "./atoms/LikeButton";
import { TextArea } from "semantic-ui-react";

const theme= createMuiTheme({
  typography:{
    fontFamily:'Big Shoulders Stencil Display'
  }
})
const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: 300,
    margin: "1%",
    textDecoration:'none',
    textAlign:"left",
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
    padding: "0% 1%" ,
    color:"#292827",
    
  },
  hoverlink:{
backgroundColor:"#e9f2f1"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function RecipeReviewCard(props) {
  const [hoverState,setHover]=useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = useState({});

  function toggle(){
    setHover(!hoverState);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
console.log(hoverState);
  return (
    <div>
      <Card className={classes.root}>
        <Link to={"/Posts/" + props.id} style={{textDecoration:'none'}} >
          <CardActionArea className={classes.link} onMouseEnter={toggle} className={hoverState?classes.hoverlink:classes.link} onMouseLeave={toggle}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.small}>
                  {props.icon}
                </Avatar>
              }
              style={{color:"#524f4f",paddingBottom:"0.5%",paddingTop:"0.5%"}}
              titleTypographyProps={{ variant: "subtitle2" }}
              title={user.firstName + " " + user.lastName}
              subheader={props.date}
            />
            <CardContent className={classes.content}>
              <Typography className="newFont" align="left" gutterBottom variant="h6" component="h4">
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <LikeButton id={props.id} />
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
