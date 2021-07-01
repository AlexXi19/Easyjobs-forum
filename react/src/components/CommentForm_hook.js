import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Comment } from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import { SessionContext } from "./UserContext";
import Axios from "axios";
import { useParams } from "react-router-dom";

let btnOn = false;

function CommentForm_Hooks(props) {
  const { id } = useParams();
  console.log(id);
  const [error, setError] = useState("");
  const [comment, setComment] = useState({
    // id: 0,
    message: "",
    // reply: [],
  });
  const { session } = useContext(SessionContext);

  // Handle form input field changes & update the state
  function handleFieldChange(event) {
    const { value, name } = event.target;
    btnOn = true;

    setComment((prevComment) => {
      return { ...prevComment, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      setError("All fields are required.");
      return;
    }
    let data = {
      commentContent: comment.message,
      replyPostID: id,
      ReplyToID: null,
    };

    Axios.post("http://localhost:5000/addComment", data).then(
      (response) => {
        console.log("Added Comment");
        console.log(response.data);
        props.addComment(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

    setComment({ message: "" });
  }

  function isFormValid() {
    return comment.message !== "";
  }

  function renderError() {
    return error ? <div className="alert alert-danger">{error}</div> : null;
  }

  return (
    <div>
      <Form method="post" onSubmit={onSubmit} style={{ width: "100%" }}>
        <Avatar
          src="https://picsum.photos/200"
          aria-label="recipe"
          className="avatar"
          style={{ marginRight: "2%" }}
        >
          R
        </Avatar>
        <Comment.Author
          style={{ marginBottom: "30%", marginLeft: "0%" }}
          className="commentName"
          as="a"
        >
          {session.name}
        </Comment.Author>
        <Form.TextArea
          onChange={handleFieldChange}
          value={comment.message}
          name="message"
          placeholder="添加一个评论"
        />
        {renderError()}

        {btnOn ? (
          <div className="commentBTN">
            <Button primary>评论</Button>
          </div>
        ) : null}
      </Form>
    </div>
  );
}

export default CommentForm_Hooks;
