import React, { useContext, useState } from "react";
import { Grid, Form, Message, Icon } from "semantic-ui-react";
import Card from "react-bootstrap/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Axios from "axios";
import { SessionContext } from "./UserContext";
import Button from "@material-ui/core/Button";

function PostForm(props) {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const { session } = useContext(SessionContext);
  const [isEditing, setIsEditing] = useState(props.isEdit ? true : false);

  const [post, setPost] = useState({
    id: 0,
    name: "",
    title: props.title,
    text: props.content,
  });

  function handleTextChange(event) {
    const { value, name } = event.target;

    if (post.title !== "") {
      setFormError(false);
    }

    setSubmitted(false);

    setPost((prevValue) => {
      if (name === "text") {
        return {
          id: prevValue.id,
          name: prevValue.name,
          title: prevValue.title,
          text: value,
        };
      } else if (name === "title") {
        return {
          id: prevValue.id,
          name: prevValue.name,
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
      return;
    }

    let data = {
      PostTitle: post.title,
      PostContent: post.text,
    };

    console.log(data);

    setSubmitted(true);

    if (isEditing) {
      data.postID = props.id;

      console.log("Updating Post");
      Axios.patch("http://localhost:5000/updatePost", data).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Axios.post("http://localhost:5000/addPost", data).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      setFormError(false);
      setPost({ id: 0, name: "", title: "", text: "" });
    }
  }

  return (
    <div className="center" style={{ marginTop: "1%" }}>
      <Grid style={{ height: "100%" }}>
        <Grid.Column>
          <Card style={{ width: "75vw", maxWidth: "1000px", height: "100%" }}>
            <Form
              size="large"
              onSubmit={onSubmit}
              className="ui form success"
              error={formError}
            >
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                titleTypographyProps={{ variant: "subtitle2" }}
                // title={props.name}
                title={session.userName} //"作者"
                subheader={date.toLocaleDateString(undefined, options)}
              />
              {submitted && (
                <Message success>
                  <Icon name="check" />
                  {isEditing ? "Post Updated" : "Post Created"}
                </Message>
              )}
              <div className="form-group">
                <Form.Input
                  error={
                    formError && {
                      content: "请输入你的标题",
                      pointing: "below",
                    }
                  }
                  type="text"
                  id="title"
                  name="title"
                  placeholder="标题"
                  value={post.title}
                  onChange={handleTextChange}
                />
              </div>
              <div className="form-group">
                <Form.TextArea
                  placeholder="请输入内容"
                  name="text"
                  style={{ minHeight: "30rem" }}
                  rowsMin={30}
                  value={post.text}
                  onChange={handleTextChange}
                />
              </div>
              {isEditing ? (
                <div>
                  <Button size="small" color="primary" onClick={onSubmit}>
                    更新
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={props.cancelEdit}
                  >
                    取消
                  </Button>
                </div>
              ) : (
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  更新
                </Button>
              )}
              {/* <Button primary className="ui submit button">
                {isEditing ? "更新" : "发布"}
              </Button> */}
            </Form>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default PostForm;
