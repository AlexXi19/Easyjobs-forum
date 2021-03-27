import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import UserContext from "../components/UserContext";

function Login() {
  var UserisRegistered = false;
  const [isRegistered, setRegisterState] = useState(true);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user, updateUser } = useContext(UserContext);

  function handleClick() {
    setRegisterState(!isRegistered);
  }

  // function handleChange(e){
  //   setUserName(e.target.value);
  // }
  async function signUp(e) {
    e.preventDefault();

    console.log("react sign up called");
    console.log(document.getElementById("username").value);
    if (isRegistered) {
      let userName = document.getElementById("username")?.value;
      let password = document.getElementById("password")?.value;
      let data = {
        userName: userName,
        password: password,
      };
      Axios.post("http://localhost:5000/login", data).then(
        (response) => {
          updateUser(userName);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      let userName = document.getElementById("username")?.value;
      let password = document.getElementById("password")?.value;
      let firstName = document.getElementById("firstname")?.value;
      let lastName = document.getElementById("lastname")?.value;
      let data = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      Axios.post("http://localhost:5000/register", data).then(
        (response) => {
          updateUser(userName);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    console.log(user);
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    Button: {
      marginTop: "4%",
    },
    card: {
      width: "40%",
      margin: "auto",
      marginTop: "10%",
      padding: "auto",
      height: "50%",
    },
    title: {
      marginBottom: "5%",
    },
    loginSquare: {
      padding: "10%",
      backgroundColor: "white",
    },
    link: {
      marginTop: "5%",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Container className={classes.loginSquare} maxWidth="xs">
          <form
            onSubmit={(e) => {
              signUp(e);
            }}
          >
            <FormGroup>
              <h1 className={classes.title}>
                {isRegistered ? "登陆易职网" : "注册易职网"}
              </h1>

              {!isRegistered ? (
                <div>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      id="firstname"
                      placeholder="名"
                      required
                      autofocus
                    >
                      {" "}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      id="lastname"
                      placeholder="姓"
                      required
                      autofocus
                    >
                      {" "}
                    </TextField>
                  </Grid>
                </div>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  id="username"
                  placeholder="邮件"
                  name="username"
                  label="邮箱"
                  required
                  autofocus
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="密码"
                  name="password"
                  size="small"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.Button}
                  color="primary"
                  variant="outlined"
                  fullWidth
                  type="submit"
                >
                  {isRegistered ? "登陆" : "注册新账号"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.link}>
                  <Link onClick={handleClick}>
                    {isRegistered ? "注册新账号" : "已有账号"}{" "}
                  </Link>
                </div>
              </Grid>
            </FormGroup>
          </form>
        </Container>
      </Card>
    </div>
  );
}
export default Login;
