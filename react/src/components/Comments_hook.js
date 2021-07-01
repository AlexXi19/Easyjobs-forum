import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CommentForm_Hooks from "./CommentForm_hook";
import Axios from "axios";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Comments(props) {
  const [comments, setComments] = useState([]);

  function addComment(comment) {
    setComments([...comments, comment]);
  }
  function addReply(reply) {
    console.log(reply);
  }

  const { id } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:5000/getCommentForPost/" + id).then(
      (response) => {
        console.log(response.data);
        setComments(response.data);
      },
      (error) => {
        console.log("Could not get posts");
        console.log(error);
      }
    );
  }, []);
  console.log(comments);
  return (
    <Card className="App bg-light shadow">
      <header className="App-header">
        <h1 className="App-title">
          评论
          <span className="px-2" role="img" aria-label="Chat"></span>
        </h1>
      </header>
      <div className="row">
        <div className="container" style={{ width: "80%" }}>
          <CommentForm_Hooks addComment={addComment} />
          {/* <CommentForm addComment={this.addComment} /> */}
        </div>
      </div>
      <div className="pt-3 bg-white">
        <CommentList addReply={addReply} comments={comments} />
      </div>
    </Card>
  );
}

export default Comments;
