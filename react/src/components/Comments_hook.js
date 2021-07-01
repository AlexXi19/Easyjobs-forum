import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CommentForm_Hooks from "./CommentForm_hook";
import Axios from "axios";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";

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
    // this.state = {
    //   comments: [
    //     {
    //       id: 1,
    //       name: "你们好",
    //       message: "新年好啊新年好祝贺大家新年好",
    //       reply: [
    //         {
    //           id: 2,
    //           name: "林学彬",
    //           message: "我们唱歌我们跳舞",
    //           reply: [
    //             {
    //               id: 3,
    //               name: "稀罕文",
    //               message: "祝贺大家新年好啊新年好",
    //               reply: [],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: 4,
    //       name: "陈晓你",
    //       message: "新年好啊新年好祝贺大家新年好.",
    //       reply: [],
    //     },
    //     {
    //       id: 5,
    //       name: "陈晓茹",
    //       message: "而我已经分不清，你是友情，还是错过的爱情",
    //       reply: [],
    //     },
    //   ],
    // };
    // this.addComment = this.addComment.bind(this);
    // this.addReply = this.addReply.bind(this);
// }

function addComment(comment) {
    setComments(
 [...comments, comment]
    );
}
function addReply(reply) {
    console.log(reply);
}


// const { id } = this.props.match.params;
//     Axios.get("http://localhost:5000/getCommentForPost/" + id).then(
//       (response) => {
//         this.setState({comments:[response.data]});
//       },
//       (error) => {
//         console.log("Could not get posts");
//         console.log(error);
//       }
//     );
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
    <div className="App container bg-light shadow">
        <header className="App-header">
            <h1 className="App-title">
                评论
                <span className="px-2" role="img" aria-label="Chat"></span>
            </h1>
        </header>
        <div className="row">
            <div style={{ width: "80%" }}>
                <CommentForm_Hooks addComment={addComment} />
                {/* <CommentForm addComment={this.addComment} /> */}
            </div>

        </div>
        <div className="pt-3 bg-white">
            <CommentList
                addReply={addReply}
                comments={comments}
            />
        </div>
    </div>
);
  }

export default Comments;
