import React from "react";
import Box from "@material-ui/core/Box"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

function Login(){
const useStyles = makeStyles((theme) => ({
   root:{
    justifyContent: 'center',
    alignItems: 'center',
    height:"100%",
   },
   Button:{
    marginTop:"4%"
   },
   card:{
    width:"40%",
    margin:"auto",
    marginTop:"10%",
    padding:"auto",
    height:"50%"
   },
   title:{
    marginBottom:"5%"
   },
   loginSquare:{
       padding:"10%",
       backgroundColor:"white",
   }
  }));
  const classes=useStyles();

    return (<div className={classes.root}>
       <Card className={classes.card}>
    <Container className={classes.loginSquare} maxWidth="xs">
   
    <FormGroup>   
        <h1 className={classes.title}>登陆易职网</h1>
            <Grid item xs={12}>
        <TextField fullWidth type="text"  name="username" label="用户名" required autofocus></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                  label="密码"
                  name="password"
                  size="small"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} >
                  <Button 
                  className={classes.Button}
                    color="primary"
                    variant="outlined"
                    fullWidth type="submit">登陆</Button>
              </Grid>
    </FormGroup>
   
    </Container>
    </Card>
   
   
    </div>)
}
export default Login;