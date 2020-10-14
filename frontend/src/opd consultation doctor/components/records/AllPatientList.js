import React, { Component } from "react";
import Axios from "axios";

import Table from "react-bootstrap/Table";
import ListItem from "./PatientListItem";

export default class AllPatientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
    };

    this.getPatientList = this.getPatientList.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.toViewPatientDetail = this.toViewPatientDetail.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("auth-token");
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

  setComponent(changeTo) {
    this.props.setComponent(changeTo);
  }

  toViewPatientDetail(id) {
    this.props.toViewPatientDetail(id);
  }

  getPatientList() {
    return this.state.patients.map((patient) => {
      return (
        <ListItem
          key={patient._id}
          patient={patient}
          link={this.toViewPatientDetail}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.patients.length !== 0 ? (
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <h3 className="h4">All patients</h3>
            </div>
            <Table striped hover responsive>
              <thead>
                <tr key="x">
                  <th>Name</th>
                  <th>NIC number</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>{this.getPatientList()}</tbody>
            </Table>
          </div>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "25px" }}>
            <h3>There are no registered patients</h3>
          </div>
        )}
      </div>
    );
  }
}
