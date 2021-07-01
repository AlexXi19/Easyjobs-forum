import React, { useContext, useState } from "react";
import { Grid, Form, Message, Icon } from "semantic-ui-react";
import Card from "react-bootstrap/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Axios from "axios";
import { SessionContext } from "./UserContext";
import Button from "@material-ui/core/Button";
import returnDateString from "./utilities/UtilityFunctions";

function PostForm(props) {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const date = new Date();
  const { session } = useContext(SessionContext);

  const [post, setPost] = useState({
    title: "",
    text: "",
  });

  function handleTextChange(event) {
    const { value, name } = event.target;

    setSubmitted(false);

    setPost((prevValue) => {
      if (name === "text") {
        return {
          title: prevValue.title,
          text: value,
        };
      } else if (name === "title") {
        setFormError(false);
        return {
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

    Axios.post("http://localhost:5000/addPost", data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    setFormError(false);
    setSubmitted(true);
    setPost({ title: "", text: "" });
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
                subheader={returnDateString(date)}
              />
              {submitted && (
                <Message success>
                  <Icon name="check" />
                  Post Created
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
              <Button variant="contained" color="primary" onClick={onSubmit}>
                发布
              </Button>
            </Form>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default PostForm;
