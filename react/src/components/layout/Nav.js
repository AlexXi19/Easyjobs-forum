import React, { useContext } from "react";
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

export default function () {
  const { session } = useContext(SessionContext);

  console.log("Look here...");
  return (
    <div>
      <Navbar className="py-0 navbar" bg="dark" expand="lg" variant="light">
        <Navbar.Brand className="navbrand text-white" href="#home">
          易职网
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto">
            <Nav.Link className="navlink text-white" href="/">
              主页
            </Nav.Link>

            {session.userName === undefined ? (
              <Nav.Link className="navlink text-white" href="/login">
                登陆
              </Nav.Link>
            ) : (
              <Nav.Link className="navlink text-white" href="/addPost">
                提问/分享
              </Nav.Link>
            )}

            {session.userName !== undefined ? (
              <Nav.Link className="navlink text-white" href="/logout">
                退出
              </Nav.Link>
            ) : null}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
      {session.userName !== undefined ? (
          
          <Nav.Link className="navlink text-white" href={"/profile/"+session.id}>
      个人中心
      </Nav.Link>

        ) : null}
          </Nav>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            {/* <Button variant="outline-dark">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
