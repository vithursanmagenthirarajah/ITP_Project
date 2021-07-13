import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./AttendantNav";
import Footer from "../footer";

class DrugIssue extends Component {
  constructor(props) {
    super(props);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeDietIssuetype = this.onChangeDietIssuetype.bind(this);
    this.onChangeAdNum = this.onChangeAdNum.bind(this);
    this.onChangeWAID = this.onChangeWAID.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      issuedDiet: "",
      admission: "",
      waID: "",
      DateTime: Date().toString(),
    };
  }

  onChangeDateTime(e) {
    this.setState({
      DateTime: e.target.value,
    });
  }
  onChangeDietIssuetype(e) {
    this.setState({
      issuedDiet: e.target.value,
    });
  }
  onChangeAdNum(e) {
    this.setState({
      admission: e.target.value,
    });
  }
  onChangeWAID(e) {
    this.setState({
      waID: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const issueDiet = {
      DateTime: this.state.DateTime,
      issuedDiet: this.state.issuedDiet,
      admission: this.state.admission,
      waID: this.state.waID,
    };
    alert("Diet Issued Sucessfully");

    console.log(issueDiet);

    axios
      .post("http://localhost:5000/api/warddiet/add", issueDiet)
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      DateTime: Date().toString(),
      issuedDiet: "",
      admission: "",
      waID: "",
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="dietForm">
          <Card.Header>Welcome Ward Attendant</Card.Header>
          <Card.Body>
            <Card.Title>Diet Issue Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="patName">
                  <Form.Label>DateTime</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDateTime}
                    value={this.state.DateTime}
                    placeholder="Enter DateTime here"
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Diet Type</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDietIssuetype}
                    value={this.state.issuedDiet}
                    placeholder="Enter Diet Type here"
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
                  <Form.Label>Ward Attendant ID</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeWAID}
                    value={this.state.waID}
                    placeholder="Enter Ward Attendant ID Here"
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Add Diet Plan
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default DrugIssue;
