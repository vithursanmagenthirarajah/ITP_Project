import React, { Component } from "react";
import Axios from "axios";

import Container from "react-bootstrap/Container";

import CdNavbar from "../components/CdNavBar";
import Footer from "../../shared/components/Footer";
import DoubleSearchBar from "../../shared/components/DoubleSearchBar";
import AllPatientList from "../components/records/AllPatientList";
import AllSearchPatientList from "../components/records/AllSearchPatientList";
import PatientDetails from "../components/records/PatientDetails.js";
import SuccessNotice from "../../shared/components/ErrorNotice";

export default class CdRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "start",
      previousComponent: "start",
      patients: [],
      searchedPatients: [],
      currentPatient: undefined,
      success: undefined,
    };

    this.onSearchAllPatientsNic = this.onSearchAllPatientsNic.bind(this);
    this.onSearchAllPatientsName = this.onSearchAllPatientsName.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.setPreviousComponent = this.setPreviousComponent.bind(this);
    this.toViewPatientDetail = this.toViewPatientDetail.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("auth-token");
    Axios.get("http://localhost:5000/api/opd_consultant/all_patients", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        this.setState({ patients: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //navigation functions
  setComponent(changeTo) {
    switch (changeTo) {
      case "start":
        this.setState({ currentComponent: "start" });
        break;
      case "search_result":
        this.setState({ currentComponent: "search_result" });
        break;
      case "patient_details":
        this.setState({ currentComponent: "patient_details" });
        break;
      default:
        this.setState({ currentComponent: "start" });
    }
  }

  setPreviousComponent(changeTo) {
    switch (changeTo) {
      case "start":
        this.setState({ previousComponent: "start" });
        break;
      case "search_result":
        this.setState({ previousComponent: "search_result" });
        break;
      default:
        this.setState({ previousComponent: "start" });
    }
  }

  goToPrevious() {
    this.setState({ currentComponent: this.state.previousComponent });
  }

  //search functions
  onSearchAllPatientsName(e) {
    if (e.target.value.trim() !== "") {
      const token = window.sessionStorage.getItem("auth-token");
      Axios.get(
        "http://localhost:5000/api/opd_consultant/all_patients/name/" +
          e.target.value,
        {
          headers: { "x-auth-token": token },
        }
      )
        .then((res) => {
          this.setState({ searchedPatients: res.data });
        })
        .catch((error) => {
          this.setComponent("start");
          console.log(error);
        });
      this.setComponent("search_result");
      this.setPreviousComponent("start");
    } else {
      this.setComponent("start");
    }
  }

  onSearchAllPatientsNic(e) {
    if (e.target.value.trim() !== "") {
      const token = window.sessionStorage.getItem("auth-token");
      Axios.get(
        "http://localhost:5000/api/opd_consultant/all_patients/nic/" +
          e.target.value,
        {
          headers: { "x-auth-token": token },
        }
      )
        .then((res) => {
          this.setState({ searchedPatients: res.data });
          this.setComponent("search_result");
          this.setPreviousComponent("start");
        })
        .catch((error) => {
          this.setComponent("start");
          console.log(error);
        });
    } else {
      this.setComponent("start");
    }
  }

  //crud functions
  toViewPatientDetail(id, from) {
    const patient = this.state.patients.find((patient) => patient._id === id);

    this.setState({ currentPatient: patient }, () => {
      this.setPreviousComponent(from);
      this.setComponent("patient_details");
    });
  }

  render() {
    return (
      <div>
        <div style={{ minHeight: "calc(100vh - 70px" }}>
          <CdNavbar />
          <div style={{ paddingTop: "60px" }}>
            {this.state.currentComponent === "start" ||
            this.state.currentComponent === "search_result" ? (
              <div>
                <Container className="d-flex justify-content-between felx-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Patient records</h1>
                </Container>
                <Container>
                  <DoubleSearchBar
                    onSearch1={this.onSearchAllPatientsName}
                    text1="Search by name"
                    onSearch2={this.onSearchAllPatientsNic}
                    text2="Search by NIC number"
                  />
                  <hr />
                </Container>
              </div>
            ) : (
              <div></div>
            )}
            <Container>
              {this.state.success !== "" && this.state.success !== undefined && (
                <div style={{ paddingBottom: "5px" }}>
                  <SuccessNotice
                    variant="success"
                    msg={this.state.success}
                    clearError={() => this.setState({ success: "" })}
                  />
                </div>
              )}
              {this.state.currentComponent === "start" ? (
                <AllPatientList
                  patients={this.state.patients}
                  setComponent={this.setComponent}
                  toViewPatientDetail={this.toViewPatientDetail}
                />
              ) : (
                <div></div>
              )}
              {this.state.currentComponent === "search_result" ? (
                <AllSearchPatientList
                  patients={this.state.searchedPatients}
                  setComponent={this.setComponent}
                  toViewPatientDetail={this.toViewPatientDetail}
                />
              ) : (
                <div></div>
              )}

              {this.state.currentComponent === "patient_details" ? (
                <div>
                  <PatientDetails
                    patient={this.state.currentPatient}
                    goToPrevious={this.goToPrevious}
                    setComponent={this.setComponent}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
