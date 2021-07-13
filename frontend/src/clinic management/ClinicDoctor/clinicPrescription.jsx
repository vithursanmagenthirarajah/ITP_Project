import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./clinicDocNav";
import Footer from "../../ward management/footer";

class DrugIssue extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDrugname = this.onChangeDrugname.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      drugName: "",
      quantity: "",
      unit: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDrugname(e) {
    this.setState({
      drugName: e.target.value,
    });
  }
  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }
  onChangeUnit(e) {
    this.setState({
      unit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const clinicpres = {
      name: this.state.name,
      drugName: this.state.drugName,
      quantity: this.state.quantity,
      unit: this.state.unit,
    };

    console.log(clinicpres);

    axios
      .post("http://localhost:5000/api/clinicpres/add", clinicpres)
      .then((res) => {
        console.log(res.data);
        alert("Prescription Added Sucessfully");
      });

    this.setState({
      name: "",
      drugName: "",
      quantity: "",
      unit: "",
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="preForm">
          <Card.Header>Welcome Clinic Doctor</Card.Header>
          <Card.Body>
            <Card.Title>Clinic Prescription Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="date">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    required={true}
                    type="text"
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter Patient Name here"
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Drug Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDrugname}
                    value={this.state.drugName}
                    placeholder="Enter Drug Name here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeQuantity}
                    value={this.state.quantity}
                    placeholder="Enter Quantity Here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeUnit}
                    value={this.state.unit}
                    placeholder="Enter Unit Here"
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Add Prescription
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default DrugIssue;
