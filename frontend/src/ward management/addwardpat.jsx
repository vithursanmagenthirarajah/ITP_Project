import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

class wardpatient extends Component {
  constructor(props) {
    super(props);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeIssuetype = this.onChangeIssuetype.bind(this);
    this.onChangeAdNum = this.onChangeAdNum.bind(this);
    this.onChangeDisease = this.onChangeDisease.bind(this);
    this.onChangeTreatment = this.onChangeTreatment.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // dTime: "",
      Name: "",
      ward: "",
      admission: "",
      disease: "",
      Treatment: "",
    };
  }

  onChangeDateTime(e) {
    this.setState({
      Name: e.target.value,
    });
  }
  onChangeIssuetype(e) {
    this.setState({
      ward: e.target.value,
    });
  }
  onChangeAdNum(e) {
    this.setState({
      admission: e.target.value,
    });
  }
  onChangeDisease(e) {
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
    const patDetails = {
      Name: this.state.Name,
      ward: this.state.ward,
      admission: this.state.admission,
      disease: this.state.disease,
      Treatment: this.state.Treatment,
    };
    alert("Pat added successfully");

    console.log(patDetails);

    axios
      .post("http://localhost:5000/api/wardpatient/add", patDetails)
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      Name: "",
      ward: "",
      admission: "",
      Treatment: "",
      disease: "",
    });
  }

  render() {
    return (
      <div>
        <Card className="preForm">
          <Card.Header>Welcome Nursing Staff</Card.Header>
          <Card.Body>
            <Card.Title>Add</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="patName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeDateTime}
                    value={this.state.Name}
                    placeholder="Enter DateTime here"
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Ward</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeIssuetype}
                    value={this.state.ward}
                    placeholder="Enter Type here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>Admission Number</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeAdNum}
                    value={this.state.admission}
                    placeholder="Enter Admission num Here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>disease</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeDisease}
                    value={this.state.disease}
                    placeholder="Enter Admission num Here"
                  />
                </Form.Group>
                <Form.Group controlId="diagnosis">
                  <Form.Label>trtmt</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.onChangeTreatment}
                    value={this.state.Treatment}
                    placeholder="Enter Admission num Here"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add
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
