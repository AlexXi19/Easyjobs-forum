import { AddComment, FormatListNumbered } from "@material-ui/icons";
import React, { Component,useState} from "react";
import {Form,Image,TextArea,Button,Comment} from "semantic-ui-react";
import Avatar from '@material-ui/core/Avatar';



var btnOn=false;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",

      comment: {
        id:0,
        name: "",
        message: "",
        reply:[]
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  
  handleFieldChange = event => {
    function uniqueID() {
      return Math.floor(Math.random() * Date.now())
      }
    const { value, name } = event.target;
    btnOn=true;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        id:uniqueID(),
        [name]: value,
        name:"唔铠闻",
        reply:[]
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(e) {
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    this.props.addComment(this.state.comment);
             this.setState({
            comment: { ...this.state.comment,name:"", message: "",reply:"" }
          });
  }

    // loading status and clear error
    // this.setState({ error: "", loading: true });

    // persist the comments on server
  //   let { comment } = this.state;
  //   console.log(comment);
  //   fetch("http://localhost:3000", {
  //     method: "post",
  //     body: JSON.stringify(this.state.comment)
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.error) {
  //         this.setState({ loading: false, error: res.error });
  //       } else {
  //         // add time return from api and push comment to parent state
  //         this.state.comment.time = res.time;
  //         this.props.addComment(this.state.comment);
  //         // clear the message box
  //         this.setState({
  //           loading: false,
  //           comment: { ...this.state.comment, message: "" }
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: "Something went wrong while submitting form.",
  //         loading: false
  //       });
  //     });
  // }

  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }
  

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <div>
      
          <Form method="post" onSubmit={this.onSubmit}>
          <Avatar src="https://picsum.photos/700" aria-label="recipe" className="avatar">
            R
          </Avatar>
          <Comment.Author className="commentName" as='a'>作者</Comment.Author>
          {/* <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="😎 Your Name"
              name="name"
              type="text"
            />
          </div> */}
         <Form.TextArea  onChange={this.handleFieldChange}
              value={this.state.comment.message}  name="message" placeholder="添加一个评论"/>
          {this.renderError()}

         {btnOn?( <div className="commentBTN">
            <Button primary >
              评论
            </Button> 
          </div>):null}
          </Form>
     
      </div>
    );
  }
}