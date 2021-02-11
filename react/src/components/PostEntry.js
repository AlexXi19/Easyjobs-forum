import React from "react";
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const preventDefault = (event) => event.preventDefault();

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
              title={props.name}
              subheader="September 14, 2016"
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
