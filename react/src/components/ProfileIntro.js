
import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import { SessionContext } from "./UserContext";
import EditIcon from '@material-ui/icons/Edit';
import ReactDOM from "react-dom";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function edit(){
    let inputForm=document.getElementById("editform");
    let originalName=document.getElementById("sessionID");
    ReactDOM.findDOMNode(inputForm).classList.remove("hide");
    ReactDOM.findDOMNode(originalName).classList.add("hide");
}   


const useStyles = makeStyles((theme) => ({
root:{
    textAlign:"center"
},
name:{
    paddingTop:"2%"
},
email:{
    paddingTop:"2%"
},
media:{
    borderRadius:"50%",
    paddingTop:"3%",
    position:"relative"
},
hide:{
    display:"None"
}
}))

function Intro(){
    const { id } = useParams();
    const { session } = useContext(SessionContext);
    const classes = useStyles();
    const history = useHistory();
const [Name,setName]=useState(session.firstName);
const [email,setEmail]=useState(session.userName);

useEffect(() => {

    Axios.get("http://localhost:5000/getNamebyID/"+id).then(
        (response) => {
            setName(response.data.firstName+" "+response.data.lastName);
            console.log("here"+response.data);
          },
          (error) => {
            console.log("Could not get User");
            console.log(error);
          }
        );

    }, []);

    return <div>
<Card className={classes.root}>
<div><button onClick={edit}><EditIcon/></button></div>

<img
        className={classes.media}
        src="https://picsum.photos/100/100"
        title="Contemplative Reptile"
      />
    
    <CardContent id="sessionID">
    <Typography className={classes.name} variant="h5">{Name}</Typography>
    
    <Typography className={classes.email} variant="body1">{email}</Typography>
   
    </CardContent>
    <form id="editform" className={classes.hide}>
    <input></input>
    <input></input>
    </form>
</Card>
</div>
}

export default Intro;