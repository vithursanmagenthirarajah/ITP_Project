import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import logo from "../Photo/hospital.png";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

class NavBar extends Component {
  render() {
    return (
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Link to="#">
          <Image
            widthmage
            src={logo}
            rou="40px"
            height="40px"
            className="mr-3"
          />
        </Link>
        <Navbar.Brand href="#home">Siddha Ayrvedic Base Hospital</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/viewwardpres">View Added Prescriptions</Nav.Link>
            <Nav.Link href="/viewwardvisit">View Visit List</Nav.Link>
          </Nav>
          <Form inline></Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
