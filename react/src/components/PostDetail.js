import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";
import { SessionContext } from "./UserContext";
import FormDialog from "./UpdatePostDialog";
import returnDateString from "./utilities/UtilityFunctions";
import Comments from "./Comments_hook.js";
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
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const history = useHistory();
  const { session } = useContext(SessionContext);
  const [comments, setComments] = useState([
    {
      id: 0,
      name: "对啦可是江东父老课",
      message: "hiiii",
      reply: [],
    },
  ]);
  useEffect(() => {
    console.log("Finding Post");

    Axios.get("http://localhost:5000/getPostById/" + id).then(
      (response) => {
        setPost(response.data);
        console.log(response.data);
      },
      (error) => {
        console.log("Could not get post");
        console.log(error);
      }
    );

    Axios.get("http://localhost:5000/getUserByPost/" + id).then(
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

  function deletePost(event) {
    console.log("Deleting Post...");

    Axios.delete("http://localhost:5000/deletePost", {
      data: {
        postID: id,
      },
    }).then(
      (response) => {
        console.log("Post Deleted");
        history.push("/");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  console.log(session, user.email);

  return (
    <div>
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
                {/* {post.icon} */}
              </Avatar>
            }
            titleTypographyProps={{ variant: "subtitle2" }}
            title={user.firstName + " " + user.lastName}
            subheader={returnDateString(post.date)}
            className={classes.author}
          />
          <Typography variant="body1" color="textPrimary" component="p">
            {post.content}
          </Typography>
        </CardContent>

        {session.userName === user.email ? (
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
            <FormDialog title={post.title} content={post.content} id={id} />
            <Button size="small" color="secondary" onClick={deletePost}>
              Delete Post
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
}
