import React from "react";
import { Button, Row, Col, Form, FormControl } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const OrderTreat = () => {
  return (
    <div>
      <Navbar bg="success" variant="dark">
        <Navbar.Brand href="#home">
          Ayurvedic Base Hospital Batticaloa
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="http://localhost:3000/">PHARMACY</Nav.Link>
          <Nav.Link href="http://localhost:3000/">WARD</Nav.Link>
          <Nav.Link href="http://localhost:3000/">CLINIC</Nav.Link>
          <Nav.Link href="http://localhost:3000/">OPD</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
      <h1 style={{ textAlign: "center" }}> Order Treatment items </h1>
      <Form>
        <Form.Group as={Row} controlId="formHorizontaltreatmentID">
          <Form.Label column sm={2}>
            Treatment ID:
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Treatment ID" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Treatment Item Name:
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Treatment Item Name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalQuantity">
          <Form.Label column sm={2}>
            Quantity:
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="number" placeholder="Quantity" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalDate">
          <Form.Label column sm={2}>
            Order Date:
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="date" placeholder="Issue date" />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Type
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Drugs"
                name="formHorizontalRadios"
                id="formHorizontalRadios4"
              />
              <Form.Check
                type="radio"
                label="Ingredients"
                name="formHorizontalRadios"
                id="formHorizontalRadios5"
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">ADD</Button>
          </Col>
        </Form.Group>
      </Form>

      <div>
        <footer
          style={{
            height: "50px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              paddingBottom: "5px",
              backgroundColor: "#128b27",
            }}
          >
            <hr />
            &copy; 2020 copyright: SABH-PK.com
          </div>
        </footer>
      </div>
    </div>
  );
};
export default OrderTreat;
