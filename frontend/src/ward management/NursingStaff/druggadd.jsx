import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./Navbar";
import Footer from "../footer";

class DrugAdd extends Component {
  constructor(props) {
    super(props);

    this.onChangeDname = this.onChangeDname.bind(this);
    this.onChangeDtype = this.onChangeDtype.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      drugName: "",
      type: "",
      availableQuantity: "",
      unit: "",
    };
  }

  onChangeDname(e) {
    this.setState({
      drugName: e.target.value,
    });
  }
  onChangeDtype(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeQuantity(e) {
    this.setState({
      availableQuantity: e.target.value,
    });
  }
  onChangeUnit(e) {
    this.setState({
      unit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const drugDetails = {
      drugName: this.state.drugName,
      type: this.state.type,
      availableQuantity: this.state.availableQuantity,
      unit: this.state.unit,
    };

    console.log(drugDetails);

    axios
      .post("http://localhost:5000/api/drugadd/add", drugDetails)
      .then((res) => {
        console.log(res.data);
        alert("Drug Added Sucessfully");
      });

    this.setState({
      drugName: "",
      type: "",
      availableQuantity: "",
      unit: "",
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="addForm">
          <Card.Header>Welcome Nursing Staff</Card.Header>
          <Card.Body>
            <Card.Title>Drug Add Form</Card.Title>
            <Card.Text>
              <Form className="preForm2" onSubmit={this.onSubmit}>
                <Form.Group controlId="drugName">
                  <Form.Label>Drug name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDname}
                    value={this.state.drugName}
                    placeholder="Enter Drug name here"
                  />
                </Form.Group>

                <Form.Group controlId="drugType">
                  <Form.Label>Drug Type</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDtype}
                    value={this.state.type}
                    placeholder="Enter Type here"
                  />
                </Form.Group>

                <Form.Group controlId="avQuantity">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeQuantity}
                    value={this.state.availableQuantity}
                    placeholder="Enter Quantity Here"
                  />
                </Form.Group>

                <Form.Group controlId="dUnit">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    onChange={this.onChangeUnit}
                    value={this.state.unit}
                    type="text"
                    required={true}
                    placeholder="Enter Unit Here"
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="success" type="submit" className="btn">
                    Add Drug
                  </Button>
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <Footer />
      </div>
    );
  }
}
export default DrugAdd;
