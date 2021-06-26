import React, { useContext,useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { SessionContext } from "../UserContext";
import { makeStyles } from "@material-ui/core/styles";



export default function () {
  const [activeKey,setactiveKey]=useState()
  const { session } = useContext(SessionContext);
  const useStyles = makeStyles((theme) => ({
    bar: {
      // height: "100%",
      backgroundColor: "#bcd2d4",
backgroundImage: 'url("https://www.transparenttextures.com/patterns/60-lines.png")',

    },
    item: {
      margin:"1%",
      height:"100%",
      display:"inline"
    },
    search:{
      marginLeft:"10%",
      position:"relative"
    },
    nav:{
      width:"100%",
    }
  }));
  const classes = useStyles();
  return (
    <div>
      <Navbar fixed="top" className=" navbar" className={classes.bar}  expand="md" variant="light">
        <Navbar.Brand className="navbrand text-white" href="/">
          易职网
        </Navbar.Brand>
        <Form inline className={classes.search}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            {/* <Button variant="outline-dark">Search</Button> */}
          </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav variant="tabs" className="nav mr-auto" className={classes.nav} onSelect={(eventKey) => activeKey=eventKey} >
          <Nav.Item className={classes.item} >
            <Nav.Link className="navlink text-black" href="/">
              主页
            </Nav.Link>
            </Nav.Item>
            {session.userName === undefined ? (
              <Nav.Item className={classes.item} >
              <Nav.Link eventKey="link-1" className="navlink text-black" href="/login">
                登陆
              </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item className={classes.item}> 
              <Nav.Link eventKey="link-2" className="navlink text-black" href="/addPost">
                提问/分享
              </Nav.Link>
              </Nav.Item>
            )}

            {session.userName !== undefined ? (
              <Nav.Item className={classes.item}>
              <Nav.Link className="navlink text-black" href="/logout">
                退出
              </Nav.Link>
              </Nav.Item>
            ) : null}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
      {session.userName !== undefined ? (
        <Nav.Item className={classes.item}>
          <Nav.Link className="navlink text-black" href={"/profile/"+session.id}>
      个人中心
      </Nav.Link>
</Nav.Item>
        ) : null}
          </Nav>

          
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
