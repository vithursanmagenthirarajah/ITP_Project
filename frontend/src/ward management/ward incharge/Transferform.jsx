import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Header from "./wardinchNav";
import Footer from "../footer";
class TransForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeDOT = this.onChangeDOT.bind(this);
    this.onChangeStrtmnt = this.onChangeStrtmnt.bind(this);
    this.onChangeRdurationofresidence = this.onChangeRdurationofresidence.bind(
      this
    );
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeReport = this.onChangeReport.bind(this);
    this.onChangewardinch = this.onChangewardinch.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      DateTime: Date().toString(),
      to: "",
      DOT: Date().toString(),
      suggestedTreatment: "",
      durationofresidence: "",
      reason: "",
      report: "",
      wardinch: "",
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
  onChangeTo(e) {
    this.setState({
      to: e.target.value,
    });
  }
  onChangeDOT(e) {
    this.setState({
      DOT: e.target.value,
    });
  }
  onChangeStrtmnt(e) {
    this.setState({
      suggestedTreatment: e.target.value,
    });
  }
  onChangeRdurationofresidence(e) {
    this.setState({
      durationofresidence: e.target.value,
    });
  }
  onChangeReason(e) {
    this.setState({
      reason: e.target.value,
    });
  }
  onChangeReport(e) {
    this.setState({
      report: e.target.value,
    });
  }
  onChangewardinch(e) {
    this.setState({
      wardinch: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const transferForm = {
      name: this.state.name,
      DateTime: this.state.DateTime,
      to: this.state.to,
      DOT: this.state.DOT,
      suggestedTreatment: this.state.suggestedTreatment,
      durationofresidence: this.state.durationofresidence,
      reason: this.state.reason,
      report: this.state.report,
      wardinch: this.state.wardinch,
    };
    alert("Request Sent");

    axios
      .post("http://localhost:5000/api/transfer/add", transferForm)
      .then((res) => {
        console.log(res.data);
      });

    this.setState({
      name: "",
      DateTime: Date().toString(),
      to: "",
      DOT: Date().toString(),
      suggestedTreatment: "",
      durationofresidence: "",
      reason: "",
      report: "",
      wardinch: "",
    });
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Card className="tForm">
          <Card.Header>Ward Transfer Form</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="dtime">
                  <Form.Label>Enter Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeName}
                    value={this.state.name}
                    placeholder="Enter patient Name here"
                  />
                </Form.Group>
                <Form.Group controlId="dtime">
                  <Form.Label>Date Time</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    required={true}
                    onChange={this.onChangeDateTime}
                    value={this.state.DateTime}
                    placeholder="Enter date time here"
                  />
                </Form.Group>

                <Form.Group controlId="tplace">
                  <Form.Label>Transfered Place</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    placeholder="Transfered to"
                    onChange={this.onChangeTo}
                    value={this.state.to}
                  />
                </Form.Group>
                <Form.Group controlId="trtmt">
                  <Form.Label>Suggested Treatment</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeStrtmnt}
                    value={this.state.suggestedTreatment}
                    placeholder="Enter suggested treatment here"
                  />
                </Form.Group>
                <Form.Group controlId="DOT">
                  <Form.Label>DOT</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    required={true}
                    onChange={this.onChangeDOT}
                    value={this.state.DOT}
                    placeholder="Enter DOT here"
                  />
                </Form.Group>
                <Form.Group controlId="duration">
                  <Form.Label>Duration of Residence</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeRdurationofresidence}
                    value={this.state.durationofresidence}
                    placeholder="Enter Duration of Residence here"
                  />
                </Form.Group>
                <Form.Group controlId="reason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeReason}
                    value={this.state.reason}
                    placeholder="Enter Reason here"
                  />
                </Form.Group>
                <Form.Group controlId="report">
                  <Form.Label>Report</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangeReport}
                    value={this.state.report}
                    placeholder="Enter Report here"
                  />
                </Form.Group>
                <Form.Group controlId="wardincharge">
                  <Form.Label>Ward Incharge Name</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={this.onChangewardinch}
                    value={this.state.wardinch}
                    placeholder="Enter the name of ward incharge here"
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Transfer
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

export default TransForm;
