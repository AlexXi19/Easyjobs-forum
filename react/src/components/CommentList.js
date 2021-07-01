import React, { useState } from "react";
import Commented from "./Comment";
import { Button, Comment, Form, Header } from "semantic-ui-react";

export default function CommentList(props) {
  return (
    // <div className="commentList">
    /* <h5 className="text-muted mb-4">
                <span className="badge badge-success">{props.comments.length}</span>{" "}Comment{props.comments.length>0?"s":""}
            </h5>
            {props.comments.length===0&& !props.loading?(<div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null} */

    <Comment.Group className="comment">
      {/* <Header as='h3' dividing>
     Comments
   </Header> */}
      {props.comments.map((comment) => (
        <Commented
          key={comment._id}
          addReply={props.addReply}
          comment={comment}
          type="parent"
        />
      ))}
    </Comment.Group>
    /* </div> */
  );
}
