import React, { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";

function Commented(props) {
  const { name, message, time } = props.comment;
  const [clicked, setClicked] = useState(false);
  const [reply, setReply] = useState([]);
  const [inputText, setInputText] = useState("");
  const [replyName, setReplyName] = useState("");
  const [id, setID] = useState(0);
  //  var lastID=Math.max.apply(id.map((item)=>{
  //    return id;
  //  }));

  function uniqueID() {
    return Math.floor(Math.random() * Date.now());
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
    setReplyName("Alex Xi");
    setID(uniqueID());
  }

  function handleClicked() {
    setClicked(!clicked);
  }

  function handleSubmit() {
    setReply((prevItems) => {
      return [
        ...prevItems,
        [
          {
            id: id,
            name: replyName,
            message: inputText,
          },
        ],
      ];
    });
    setInputText("");
    handleClicked();
  }
  const nestedComments = reply.map((comment) => {
    return (
      <Commented
        key={comment[0].id}
        comment={comment[0]}
        name={comment[0].name}
        type="children"
      />
    );
  });

  return (
    //   <Comment.Group>
    // <Header as='h3' dividing>
    //   Comments
    // </Header>

    <Comment className="comment">
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{name}</Comment.Author>
        <Comment.Metadata>
          <div>{time}</div>
        </Comment.Metadata>
        <Comment.Text>{message}</Comment.Text>

        <Comment.Actions>
          <Comment.Action onClick={handleClicked}>
            {clicked ? "收起" : "回复"}
          </Comment.Action>
        </Comment.Actions>

        {clicked ? (
          <Form reply onSubmit={handleSubmit}>
            <Form.TextArea onChange={handleChange} value={inputText} />
            <Button content="回复" labelPosition="left" icon="edit" primary />
          </Form>
        ) : null}
        {nestedComments}
      </Comment.Content>

      {/*    
   {reply.map((content,index)=>(
    <Comment.Text key={index}>{content}</Comment.Text>
   ))} */}
    </Comment>

    //   { <Form reply>
    //     <Form.TextArea />
    //     <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    //   </Form>
    // </Comment.Group> }
  );
}
// export default function Comment(props) {
//   const { name, message, time } = props.comment;

//   return (
//     <div className="media mb-3">
//       <img
//         className="mr-3 bg-light rounded"
//         width="48"
//         height="48"
//         src={`https://picsum.photos/200/300`}
//         alt={name}
//       />

//       <div className="media-body p-2 shadow-sm rounded bg-light border">
//         <small className="float-right text-muted">{time}</small>
//         <h6 className="mt-0 mb-1 text-muted">{name}</h6>
//         {message}
//       </div>
//     </div>
//   );
// }

export default Commented;
