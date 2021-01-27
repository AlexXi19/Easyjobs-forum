import React,{Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

class Comments extends Component{
    constructor (props){
        super(props);
        this.state={
            comments:[ {id: 1, name: "landiggity", message: "This is my first comment on this forum so don't be a dick",reply:[{
              id:2,name:"Jason", message:"This is a test", reply:[{
                id:3, name:"Alex",message:"This is an important one",reply:[]
              }]
            }]},
            {id: 4, name: "scarlett-jo", message: "That's a mighty fine comment you've got there my good looking fellow...",reply:[]},
            {id: 5, name: "rosco", message: "What is the meaning of all of this 'React' mumbo-jumbo?",reply:[]}],
           };
        this.addComment=this.addComment.bind(this);
        this.addReply=this.addReply.bind(this);
    }
   
    addComment(comment) {
      this.setState({
        comments: [comment, ...this.state.comments]
      });
    }
  addReply(reply){ 
    console.log(reply);
  }


    render(){
        const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
        return (<div className="App container bg-light shadow">
        <header className="App-header">
         
          <h1 className="App-title">
             Comments
            <span className="px-2" role="img" aria-label="Chat">
              
            </span>
          </h1>
        </header><div className="row">
          <div className="col-4  pt-3 border-right">
            <CommentForm addComment={this.addComment}/>
          </div>
          <div className="col-8  pt-3 bg-white">
          <CommentList
          addReply={this.addReply}
   comments={this.state.comments}
/>
          </div>
        </div>
        </div>)
    }
}
export default Comments;