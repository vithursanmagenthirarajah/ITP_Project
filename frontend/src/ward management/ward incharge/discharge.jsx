import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./wardinchNav";
import Footer from "../footer";
//import Header from "../NursingStaff/header";

class DisForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDiagnosis = this.onChangeDiagnosis.bind(this);
    this.onChangeaftTrmt = this.onChangeaftTrmt.bind(this);
    this.onChangeDod = this.onChangeDod.bind(this);
    this.onChangedayStay = this.onChangedayStay.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeRemark = this.onChangeRemark.bind(this);
    this.onChangewName = this.onChangewName.bind(this);

    this.state = {
      name: "",
      DateTime: Date().toString(),
      Diagnosis: "",
      afterTreatment: "",
      DOD: Date().toString(),
      durationofresidence: "",
      cured: "",
      remarks: "",
      chargename: "",
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      DateTime: e.target.value,
    });
  }

  onChangeDiagnosis(e) {
    this.setState({
      Diagnosis: e.target.value,
    });
  }

  onChangeaftTrmt(e) {
    this.setState({
      afterTreatment: e.target.value,
    });
  }

  onChangeDod(e) {
    this.setState({
      DOD: e.target.value,
    });
  }

  onChangedayStay(e) {
    this.setState({
      durationofresidence: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      cured: e.target.value,
    });
  }

  onChangeRemark(e) {
    this.setState({
      remarks: e.target.value,
    });
  }

  onChangewName(e) {
    this.setState({
      chargename: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const discharge1 = {
      name: this.state.name,
      DateTime: this.state.DateTime,
      Diagnosis: this.state.Diagnosis,
      afterTreatment: this.state.afterTreatment,
      DOD: this.state.DOD,
      durationofresidence: this.state.durationofresidence,
      cured: this.state.cured,
      remarks: this.state.remarks,
      chargename: this.state.chargename,
    };
    axios
      .post("http://localhost:5000/api/discharge/add", discharge1)
      .then((res) => {
        console.log(res.data);
        alert("Request Sent");
      });
    console.log(discharge1);

    this.setState({
      name: "",
      DateTime: Date().toString(),
      Diagnosis: "",
      afterTreatment: "",
      DOD: Date().toString(),
      durationofresidence: "",
      cured: "",
      remarks: "",
      chargename: "",
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="tForm">
          <Card.Header>Welcome Ward Incharge</Card.Header>
          <Card.Body>
            <Card.Title>Ward Discharge Form</Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="DateTime">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter Name here"
                  />
                </Form.Group>
                <Form.Group controlId="DateTime">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    readOnly={true}
                    onChange={this.onChangeDate}
                    value={this.state.DateTime}
                    placeholder="Enter Date here"
                  />
                </Form.Group>
                <Form.Group controlId="Diagnosis">
                  <Form.Label>Diagnosis</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeDiagnosis}
                    value={this.state.Diagnosis}
                    placeholder="Enter Diagnosis here"
                  />
                </Form.Group>
                <Form.Label>After Treatment</Form.Label>
                <Form.Group controlId="afterTrtmt">
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeaftTrmt}
                    value={this.state.afterTreatment}
                    placeholder="Enter after treatment here"
                  />
                </Form.Group>
                <Form.Group controlId="DOD">
                  <Form.Label>DOD</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    required={true}
                    onChange={this.onChangeDod}
                    value={this.state.DOD}
                    placeholder="Enter DOD here"
                  />
                </Form.Group>
                <Form.Group controlId="duration">
                  <Form.Label>Number of Days Stayed</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangedayStay}
                    value={this.state.durationofresidence}
                    placeholder="Enter number of days stayed here"
                  />
                </Form.Group>
                <Form.Group controlId="cured">
                  <Form.Label>Enter the Status</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeStatus}
                    value={this.state.cured}
                    placeholder="Cured or not"
                  />
                </Form.Group>
                <Form.Group controlId="remarks">
                  <Form.Label>Any Remarks</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeRemark}
                    value={this.state.remarks}
                    placeholder="Enter remarks here"
                  />
                </Form.Group>
                <Form.Group controlId="wardincharge">
                  <Form.Label>Ward Incharge Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangewName}
                    value={this.state.chargename}
                    placeholder="Enter the name of ward incharge here"
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Discharge
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
        <Footer />
      </div>
    );
  }
}

export default DisForm;
