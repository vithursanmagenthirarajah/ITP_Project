import React, { Component } from "react";
import Axios from "axios";
//import { Switch, Route, withRouter } from "react-router-dom";

import TcNavbar from "../components/TcNavBar";
import Footer from "../../shared/components/Footer";
import Container from "react-bootstrap/Container";

//import SingleSearchBar from "../../shared/components/SingleSearchBar";
import DoubleSearchBar from "../../shared/components/DoubleSearchBar";
import AllPatientList from "../components/AllPatientsList";
import SearchPatientList from "../components/SearchPatientList";
import PatientDetails from "../components/PatientDetails";
import EditPatientDetails from "../components/EditPatientDetails";

class TcRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "start",
      previousComponent: "start",
      patients: [],
      searchedPatients: [],
      currentPatient: undefined,
    };

    this.onSearchAllPatientsNic = this.onSearchAllPatientsNic.bind(this);
    this.onSearchAllPatientsName = this.onSearchAllPatientsName.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.toConsultation = this.toConsultation.bind(this);
    this.toEdit = this.toEdit.bind(this);
    this.toViewPatientDetail = this.toViewPatientDetail.bind(this);
    this.toDeletePatient = this.toDeletePatient.bind(this);
    this.editFinish = this.editFinish.bind(this);
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("auth-token");
    Axios.get("http://localhost:5000/api/opd_tc/all_patients", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        this.setState({ patients: res.data });
        //console.log(this.state.patients);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      case "edit_patient":
        this.setState({ currentComponent: "edit_patient" });
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
      case "patient_details":
        this.setState({ previousComponent: "patient_details" });
        break;
      case "edit_patient":
        this.setState({ currentComponent: "edit_patient" });
        break;
      default:
        this.setState({ previousComponent: "start" });
    }
  }

  onSearchAllPatientsName(e) {
    console.log(e.target.value);
    const token = window.sessionStorage.getItem("auth-token");
    Axios.get(
      "http://localhost:5000/api/opd_tc/all_patients/name/" + e.target.value,
      {
        headers: { "x-auth-token": token },
      }
    )
      .then((res) => {
        this.setState({ searchedPatients: res.data }, () => {
          console.log(res.data);
        });
        console.log(this.state.searchedPatients);
      })
      .catch((error) => {
        this.setComponent("start");
        console.log(error);
      });
    this.setComponent("search_result");
    this.setPreviousComponent("start");
  }

  onSearchAllPatientsNic(e) {
    console.log(e.target.value);
    const token = window.sessionStorage.getItem("auth-token");
    Axios.get(
      "http://localhost:5000/api/opd_tc/all_patients/nic/" + e.target.value,
      {
        headers: { "x-auth-token": token },
      }
    )
      .then((res) => {
        this.setState({ searchedPatients: res.data }, () => {
          console.log(res.data);
        });
        console.log(this.state.searchedPatients);
        this.setComponent("search_result");
        this.setPreviousComponent("start");
      })
      .catch((error) => {
        this.setComponent("start");
        console.log(error);
      });
  }

  //crud functions
  toViewPatientDetail(id, from) {
    const patient = this.state.patients.find((patient) => patient._id === id);

    this.setState({ currentPatient: patient }, () => {
      this.setPreviousComponent(from);
      this.setComponent("patient_details");
    });
  }

  toDeletePatient(id) {
    const token = window.sessionStorage.getItem("auth-token");
    Axios.delete("http://localhost:5000/api/opd_tc/" + id, {
      headers: { "x-auth-token": token },
    }).then((res) => console.log(res.data));
    this.setState({
      patients: this.state.patients.filter((element) => element._id !== id),
      searchedPatients: this.state.searchedPatients.filter(
        (element) => element._id !== id
      ),
    });
    console.log("delete" + id);
    if (this.state.previousComponent === "search_result") {
      this.setComponent("search_result");
    }
    if (this.state.previousComponent === "start") {
      this.setComponent("start");
    }
  }

  toConsultation(id) {
    const token = window.sessionStorage.getItem("auth-token");
    Axios.post("http://localhost:5000/api/opd_tc//consult/" + id, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        Axios.get("http://localhost:5000/api/opd_tc/all_patients", {
          headers: { "x-auth-token": token },
        })
          .then((res) => {
            this.setState({ patients: res.data }, () => {
              let tempResults = [];
              this.state.searchedPatients.map((searchResult) => {
                if (searchResult._id === id) {
                  tempResults.push(
                    this.state.patients.find((element) => element._id === id)
                  );
                } else {
                  tempResults.push(searchResult);
                }
              });
              this.setState({ searchedPatients: tempResults });
              const tempPatient = this.state.patients.find(
                (element) => element._id === id
              );
              this.setState({ currentPatient: tempPatient });
              if (this.state.currentComponent === "search_result") {
                console.log(this.state.currentComponent); //
                this.setComponent("search_result");
              }
              if (this.state.currentComponent === "start") {
                this.setComponent("start");
              }
              if (this.state.currentComponent === "patient_details") {
                this.setComponent("patient_details");
              }
            });

            //console.log(this.state.patients);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toEdit(id, from) {
    const patient = this.state.patients.find((patient) => patient._id === id);

    this.setState({ currentPatient: patient }, () => {
      this.setPreviousComponent(from);
      this.setComponent("edit_patient");
    });
  }

  editFinish(id) {
    console.log("delete");
    const token = window.sessionStorage.getItem("auth-token");
    Axios.get("http://localhost:5000/api/opd_tc/all_patients", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        this.setState({ patients: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
    const patient = this.state.patients.find((patient) => patient._id === id);

    this.setState({ currentPatient: patient }, () => {
      this.setComponent("edit_patient");
    });

    //this.setComponent("edit_patient");
  }

  render() {
    return (
      <div>
        <div style={{ minHeight: "calc(100vh - 70px" }}>
          <TcNavbar />
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
              {this.state.currentComponent === "start" ? (
                <AllPatientList
                  patients={this.state.patients}
                  setComponent={this.setComponent}
                  setPreviousComponent={this.setPreviousComponent}
                  toViewPatientDetail={this.toViewPatientDetail}
                  toConsultation={this.toConsultation}
                  toEdit={this.toEdit}
                  toDeletePatient={this.toDeletePatient}
                />
              ) : (
                <div></div>
              )}
              {this.state.currentComponent === "search_result" ? (
                <SearchPatientList
                  patients={this.state.searchedPatients}
                  setComponent={this.setComponent}
                  setPreviousComponent={this.setPreviousComponent}
                  toViewPatientDetail={this.toViewPatientDetail}
                  toConsultation={this.toConsultation}
                  toEdit={this.toEdit}
                  toDeletePatient={this.toDeletePatient}
                />
              ) : (
                <div></div>
              )}

              {this.state.currentComponent === "patient_details" ? (
                <div>
                  <PatientDetails
                    patient={this.state.currentPatient}
                    setComponent={this.setComponent}
                    setPreviousComponent={this.setPreviousComponent}
                    toConsultation={this.toConsultation}
                    toEdit={this.toEdit}
                    toDeletePatient={this.toDeletePatient}
                  />
                </div>
              ) : (
                <div></div>
              )}

              {this.state.currentComponent === "edit_patient" ? (
                <div>
                  <EditPatientDetails
                    patient={this.state.currentPatient}
                    setComponent={this.setComponent}
                    setPreviousComponent={this.setPreviousComponent}
                    toEdit={this.toEdit}
                    editFinish={this.editFinish}
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

export default TcRecords;