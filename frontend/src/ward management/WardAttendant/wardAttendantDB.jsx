import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./AttendantNav";
import Footer from "../footer";

const PatientAdd = (props) => (
  <tr>
    <td>{props.patDetails.admission}</td>
    <td>{props.patDetails.Name}</td>
    <td>{props.patDetails.disease}</td>
    <td>{props.patDetails.Treatment}</td>
    <td>{props.patDetails.ward}</td>

    <td>
      <Link to={"/issuediet"}>
        <Button variant="success">IssueDiet</Button>
      </Link>
    </td>
  </tr>
);

class ViewpList extends Component {
  constructor(props) {
    super(props);

    this.state = { patlist: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/wardpatient/")
      .then((response) => {
        this.setState({ patlist: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  PatientWholeList() {
    return this.state.patlist.map((currentpat) => {
      return (
        <PatientAdd
          patDetails={currentpat}
          deleteDrug={this.deleteDrug}
          key={currentpat._id}
        />
      );
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="container"
      >
        <Header />

        <Table striped bordered={false} hover>
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>Name</th>
              <th>Disease</th>
              <th>Treatment</th>
              <th>Ward Number</th>
              <th>IssueDiet</th>
            </tr>
          </thead>
          <tbody>{this.PatientWholeList()}</tbody>{" "}
        </Table>
        <Footer />
      </div>
    );
  }
}

export default ViewpList;
