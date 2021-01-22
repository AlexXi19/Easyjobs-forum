import React ,{useState} from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react'

function Commented (props) {
  const { name, message, time,reply} = props.comment;
  const [clicked,setClicked]=useState(false);
  // const [reply,setReply]=useState(props.comment.reply);
  const [inputText, setInputText] = useState("");
 

  function handleChange(event){
 const newValue=event.target.value;
 setInputText(newValue);
  }
  function handleClicked(){
   setClicked(!clicked);
   }
   function handleSubmit(){
    
    //  setReply((prevItems)=>{
    //    return[...prevItems,inputText];
    //  });
     setInputText("");
   }
const nestedComments= (reply||[]).map((comment)=>{
  console.log(comment);
 return <Commented key={comment.id} comment={comment} name={name} type="children"/>    
});

console.log(nestedComments);
 return( 
  //   <Comment.Group>
  // <Header as='h3' dividing>
  //   Comments
  // </Header>

  <Comment className="comment">
    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
    <Comment.Content>
      <Comment.Author as='a'>{name}</Comment.Author>
      <Comment.Metadata>
        <div>{time}</div>
      </Comment.Metadata>
      <Comment.Text>{message}</Comment.Text>
      {nestedComments}
      <Comment.Actions>
        <Comment.Action onClick={handleClicked} >{clicked ? "Close" : "Reply"}</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
    { clicked? (<Form reply onSubmit={handleSubmit} >
     <Form.TextArea onChange={handleChange} value={inputText}/>
     <Button content='Add Reply' labelPosition='left' icon='edit' primary />
   </Form>):null}
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
)}
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