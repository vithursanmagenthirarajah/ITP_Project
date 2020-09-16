import React, { Component } from "react";
import Axios from "axios";
import MediaQuery from "react-responsive";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Moment from "moment";

export default class PatientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patient: {},
      consultations: [],
    };

    this.getVisits = this.getVisits.bind(this);
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("auth-token");
    let patient = undefined;
    Axios.get(
      "http://localhost:5000/api/opd_consultant/" + this.props.patient._id,
      {
        headers: { "x-auth-token": token },
      }
    )
      .then((res) => {
        patient = res.data;
        this.setState({
          patient: patient,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(
      "http://localhost:5000/api/opd_consultant/consultations/" +
        this.props.patient._id,
      {
        headers: { "x-auth-token": token },
      }
    )
      .then((res) => {
        this.setState({ consultations: res.data }, () => {});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getVisits() {
    if (this.state.consultations.length !== 0) {
      return this.state.consultations.map((consultation, i) => {
        return (
          <Row
            key={i + 1}
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <Col sm={2}>
              <b>Visit {i + 1}</b>
            </Col>
            <Col sm={10}>
              {Moment(consultation.date).format("DD/MM/YYYY HH:mm")}{" "}
            </Col>
          </Row>
        );
      });
    } else {
      return (
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          No previous visits
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1200}>
          <Container>
            <div className="d-flex justify-content-between felx-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h3">
                Patient details of {this.state.patient.name}
              </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <Button onClick={this.props.goToPrevious}>&lt; Back</Button>
              </div>
            </div>
          </Container>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1200}>
          <Container>
            <div className="align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div style={{ display: "block" }}>
                <h1 className="h3">
                  Patient details of {this.state.patient.name}
                </h1>
              </div>
              <div
                className="btn-toolbar mb-2 mb-md-0"
                style={{ display: "block", overflow: "auto", paddingTop: "1%" }}
              >
                <Button
                  className="mr-0"
                  style={{
                    float: "right",
                    width: "30%",
                  }}
                  onClick={this.props.goToPrevious}
                >
                  &lt; Back
                </Button>
              </div>
            </div>
          </Container>
        </MediaQuery>
        <Container>
          <div style={{ fontSize: "1.1rem" }}>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>Name</b>
              </Col>
              <Col sm={10}>{this.state.patient.name}</Col>
            </Row>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>NIC number</b>
              </Col>
              <Col sm={10}>{this.state.patient.nic}</Col>
            </Row>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>Date of birth</b>
              </Col>
              <Col sm={10}>
                {Moment(this.state.patient.dob).format("DD/MM/YYYY")}
              </Col>
            </Row>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>Gender</b>
              </Col>
              <Col sm={10}>{this.state.patient.gender}</Col>
            </Row>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>Address</b>
              </Col>
              <Col sm={10}>{this.state.patient.address}</Col>
            </Row>
            <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Col sm={2}>
                <b>Phone</b>
              </Col>
              <Col sm={10}>{this.state.patient.phone}</Col>
            </Row>
            <hr />
            <div style={{ paddingBottom: "10px" }}>
              <h3 className="h4">Previous visits</h3>
            </div>
            {this.getVisits()}
          </div>
        </Container>
      </div>
    );
  }
}