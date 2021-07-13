import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class CliForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmpId = this.onChangeEmpId.bind(this);
    this.onChangeEmpName = this.onChangeEmpName.bind(this);
  }

  render() {
    return (
      <div>
        <Card className="dcd">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Clinic Patient Details</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CliForm;
