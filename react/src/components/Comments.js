import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CommentForm_Hooks from "./CommentForm_hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          id: 1,
          name: "你们好",
          message: "新年好啊新年好祝贺大家新年好",
          reply: [
            {
              id: 2,
              name: "林学彬",
              message: "我们唱歌我们跳舞",
              reply: [
                {
                  id: 3,
                  name: "稀罕文",
                  message: "祝贺大家新年好啊新年好",
                  reply: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "陈晓你",
          message: "新年好啊新年好祝贺大家新年好.",
          reply: [],
        },
        {
          id: 5,
          name: "陈晓茹",
          message: "而我已经分不清，你是友情，还是错过的爱情",
          reply: [],
        },
      ],
    };
    this.addComment = this.addComment.bind(this);
    this.addReply = this.addReply.bind(this);
  }

  addComment(comment) {
    this.setState({
      comments: [comment, ...this.state.comments],
    });
  }
  addReply(reply) {
    console.log(reply);
  }

  render() {
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <div className="App container bg-light shadow">
        <header className="App-header">
          <h1 className="App-title">
            评论
            <span className="px-2" role="img" aria-label="Chat"></span>
          </h1>
        </header>
        <div className="row">
          <div style={{width:"80%"}}>
            <CommentForm_Hooks addComment={this.addComment} />
            {/* <CommentForm addComment={this.addComment} /> */}
          </div>
          
        </div>
        <div className="pt-3 bg-white">
            <CommentList
              addReply={this.addReply}
              comments={this.state.comments}
            />
          </div>
      </div>
    );
  }
}
export default Comments;
