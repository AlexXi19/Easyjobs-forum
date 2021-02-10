import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import posts from "./PostDict";

const useStyles = makeStyles({
  root: {
    alignSelf: "stretch",
  },
  media: {
    height: 340,
  },
  content: {
    padding: "2% 5%",
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const { id } = useParams();
  let post = posts.find((post) => post.id == id);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/700/700"
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h3" component="h2">
          {post.title}
        </Typography>

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.icon}
            </Avatar>
          }
          titleTypographyProps={{ variant: "subtitle2" }}
          title={post.name}
          subheader="September 14, 2016"
          className={classes.author}
        />
        <Typography variant="body1" color="textPrimary" component="p">
          {post.text}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
