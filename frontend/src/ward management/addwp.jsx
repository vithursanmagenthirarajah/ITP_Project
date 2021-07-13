import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

class wardpatient extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeWard = this.onChangeWard.bind(this);
    this.onChangeAdNum = this.onChangeAdNum.bind(this);
    this.onChangedisease = this.onChangedisease.bind(this);
    this.onChangeTreatment = this.onChangeTreatment.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // dTime: "",
      admission: "",
      name: "",
      disease: "",
      age: "",
      // Treatment: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeWard(e) {
    this.setState({
      age: e.target.value,
    });
  }
  onChangeAdNum(e) {
    this.setState({
      admission: e.target.value,
    });
  }
  onChangedisease(e) {
    this.setState({
      disease: e.target.value,
    });
  }
  onChangeTreatment(e) {
    this.setState({
      Treatment: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const clinicPat = {
      name: this.state.name,
      age: this.state.age,
      admission: this.state.admission,
      disease: this.state.disease,
    };
    alert("Pat added successfully");

    console.log(clinicPat);

    axios
      .post("http://localhost:5000/api/clinic/add", clinicPat)
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      name: "",
      age: "",
      admission: "",
      disease: "",
      //Treatment: ""
    });
  }

  render() {
    return (
      <div className="container">
        <Card className="preForm">
          <Card.Header>Welcome Ward Incharge</Card.Header>
          <Card.Body>
            <Card.Title>Ward Patient Adding Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="adm">
                  <Form.Label>Enter Admission ID:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeAdNum}
                    value={this.state.admission}
                    placeholder="Enter Admission Number Here"
                  />
                </Form.Group>

                <Form.Group controlId="name">
                  <Form.Label>Enter Patient name:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter Patient name Here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Enter Patient's Disease</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangedisease}
                    value={this.state.disease}
                    placeholder="Enter Disease Here"
                  />
                </Form.Group>
                <Form.Group controlId="trtment">
                  <Form.Label>Enter Patient's age</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeWard}
                    value={this.state.age}
                    placeholder="Enter Disease Here"
                  />
                </Form.Group>

                <Button variant="success" type="submit" h>
                  Add Patient
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default wardpatient;
