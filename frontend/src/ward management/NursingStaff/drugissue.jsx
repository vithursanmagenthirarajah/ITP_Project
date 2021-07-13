import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./Navbar";
import Footer from "../footer";

class DrugIssue extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeIssuetype = this.onChangeIssuetype.bind(this);
    this.onChangeAdNum = this.onChangeAdNum.bind(this);
    this.onChangeNurseID = this.onChangeNurseID.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      Type: "",
      admission: "",
      nustaff: "",
      DateTime: Date().toString(),
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDateTime(e) {
    this.setState({
      DateTime: e.target.value,
    });
  }
  onChangeIssuetype(e) {
    this.setState({
      Type: e.target.value,
    });
  }
  onChangeAdNum(e) {
    this.setState({
      admission: e.target.value,
    });
  }
  onChangeNurseID(e) {
    this.setState({
      nustaff: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const issueDetails = {
      name: this.state.name,
      DateTime: this.state.DateTime,
      type: this.state.Type,
      admission: this.state.admission,
      nustaff: this.state.nustaff,
    };
    alert("Drug Issued Sucessfully");

    console.log(issueDetails);

    axios
      .post("http://localhost:5000/api/issue/add", issueDetails)
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      name: "",
      DateTime: Date().toString(),
      Type: "",
      admission: "",
      nustaff: "",
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="preForm">
          <Card.Header>Welcome Nursing Staff</Card.Header>
          <Card.Body>
            <Card.Title>Drug Issue Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="patName">
                  <Form.Label>DateTime</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    onChange={this.onChangeDateTime}
                    value={this.state.DateTime}
                    placeholder="Enter DateTime here"
                  />
                </Form.Group>
                <Form.Group controlId="date">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter Patient Name here"
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeIssuetype}
                    value={this.state.Type}
                    placeholder="Enter Type here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Admission Number</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeAdNum}
                    value={this.state.admission}
                    placeholder="Enter Admission num Here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Nursing Staff ID</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeNurseID}
                    value={this.state.nustaff}
                    placeholder="Enter Nursing Staff ID Here"
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Issue Drug
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
