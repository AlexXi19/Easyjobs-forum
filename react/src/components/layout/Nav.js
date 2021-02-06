import React from "react";
import {Navbar,Form, FormControl,Button,Nav,Row,Col,NavDropdown} from "react-bootstrap";


export default function(){
  return(
        <div>
        <Navbar className="py-0 navbar" bg="dark" expand="lg" variant="light">
    
   
  <Navbar.Brand className="navbrand" href="#home">Easyjobs</Navbar.Brand>

 
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="nav mr-auto">

      <Nav.Link href="/">Home</Nav.Link>
   

      <Nav.Link className="Navlink" href="/login">Login</Nav.Link>
    
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
     
    </Nav>

    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      {/* <Button variant="outline-dark">Search</Button> */}
    </Form>
  
  </Navbar.Collapse>


</Navbar>
  
</div>
    )
}