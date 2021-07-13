import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./wardDocNav";
import Footer from "../footer";

class VisitForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeReading = this.onChangeReading.bind(this);
    this.onChangeTrtmt = this.onChangeTrtmt.bind(this);
    this.onChangeDiet = this.onChangeDiet.bind(this);
    this.onChangeAdmission = this.onChangeAdmission.bind(this);
    this.onChangeWD = this.onChangeWD.bind(this);

    this.state = {
      name: "",
      datetime: Date().toString(),
      reading: "",
      treatment: "",
      dietplan: "",
      admission: "",
      warddoctor: "",
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      datetime: e.target.value,
    });
  }

  onChangeReading(e) {
    this.setState({
      reading: e.target.value,
    });
  }

  onChangeTrtmt(e) {
    this.setState({
      treatment: e.target.value,
    });
  }

  onChangeDiet(e) {
    this.setState({
      dietplan: e.target.value,
    });
  }

  onChangeAdmission(e) {
    this.setState({
      admission: e.target.value,
    });
  }

  onChangeWD(e) {
    this.setState({
      warddoctor: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const visit = {
      name: this.state.name,
      datetime: this.state.datetime,
      reading: this.state.reading,
      treatment: this.state.treatment,
      dietplan: this.state.dietplan,
      admission: this.state.admission,
      warddoctor: this.state.warddoctor,
    };
    axios.post("http://localhost:5000/api/wardvisit/add", visit).then((res) => {
      console.log(res.data);
    });
    console.log(visit);

    this.setState({
      name: "",
      datetime: Date().toString(),
      reading: "",
      treatment: "",
      dietplan: "",
      admission: "",
      warddoctor: "",
      remarks: "",
      chargename: "",
    });
    alert("Done");
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="vForm">
          <Card.Header>Welcome Ward Doctor</Card.Header>
          <Card.Body>
            <Card.Title>Ward Visit Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="datetime">
                  <Form.Label>Paient Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter Name here"
                  />
                </Form.Group>
                <Form.Group controlId="datetime">
                  <Form.Label>DateTime</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    onChange={this.onChangeDate}
                    value={this.state.datetime}
                  />
                </Form.Group>
                <Form.Group controlId="reading">
                  <Form.Label>Reading</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeReading}
                    value={this.state.reading}
                    placeholder="Enter Reading here"
                  />
                </Form.Group>
                <Form.Label>Treatment</Form.Label>
                <Form.Group controlId="afterTrtmt">
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeTrtmt}
                    value={this.state.treatment}
                    placeholder="Enter Treatment here"
                  />
                </Form.Group>
                <Form.Group controlId="dietplan">
                  <Form.Label>Diet Plan</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDiet}
                    value={this.state.dietplan}
                    placeholder="Enter Dietplan here"
                  />
                </Form.Group>
                <Form.Group controlId="duration">
                  <Form.Label>Admission Number</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeAdmission}
                    value={this.state.admission}
                    placeholder="Enter Admission Number"
                  />
                </Form.Group>
                <Form.Group controlId="warddoctor">
                  <Form.Label>Ward Doctor ID</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeWD}
                    value={this.state.warddoctor}
                    placeholder="Ward Doctor ID"
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Complete Visit
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default VisitForm;
