import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState(false);

  const [post, setPost] = useState({
    id: props.id,
    title: props.title,
    text: props.content,
  });

  console.log(post);

  function handleTextChange(event) {
    const { value, name } = event.target;

    console.log("walalalal");

    setPost((prevValue) => {
      if (name === "text") {
        return {
          id: prevValue.id,
          title: prevValue.title,
          text: value,
        };
      } else if (name === "title") {
        setFormError(false);
        return {
          id: prevValue.id,
          title: value,
          text: prevValue.text,
        };
      }
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    if (post.title === "") {
      setFormError(true);
      console.log("errpr");
      return;
    }

    let data = {
      PostTitle: post.title,
      PostContent: post.text,
      postID: post.id,
    };

    console.log("Updating Post");
    Axios.patch("http://localhost:5000/updatePost", data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    handleClose();
    window.location.reload();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit Post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            name="title"
            label="Post Header"
            autoComplete="off"
            margin="dense"
            defaultValue={props.title}
            onChange={handleTextChange}
            error={formError}
            fullWidth
            required
          />
          <TextField
            autoFocus
            id="content"
            name="text"
            label="Post Content"
            margin="dense"
            autoComplete="off"
            defaultValue={props.content}
            onChange={handleTextChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={onSubmit} color="primary">
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
