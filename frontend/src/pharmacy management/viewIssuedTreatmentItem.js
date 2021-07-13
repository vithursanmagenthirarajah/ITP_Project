import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Head from "./NavBar";

const IssueTreatmentDetails = (props) => (
  <tr>
    <td>{props.IssueTreatmentDetails.treatid}</td>
    <td>{props.IssueTreatmentDetails.treatname}</td>
    <td>{props.IssueTreatmentDetails.quantity}</td>
    <td>{props.IssueTreatmentDetails.date}</td>
    <td>{props.IssueTreatmentDetails.issueto}</td>
    <td>{props.IssueTreatmentDetails.type}</td>
    <td>
      <Button variant="dark">
        {" "}
        <Link to={"/updatetreat/" + props.IssueTreatmentDetails._id}>
          update
        </Link>
      </Button>{" "}
      |{" "}
      <Button
        variant="danger"
        href="#"
        onClick={() => {
          props.deleteIssueTreatmentDetails(props.IssueTreatmentDetails._id);
        }}
      >
        delete{" "}
      </Button>
    </td>
  </tr>
);

export default class ViewIssueTreatment extends Component {
  constructor(props) {
    super(props);

    this.deleteIssueTreatmentDetails = this.deleteIssueTreatmentDetails.bind(
      this
    );

    this.state = { IssueTreatment: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/IssueTreatment/")
      .then((response) => {
        this.setState({ IssueTreatment: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteIssueTreatmentDetails(id) {
    axios
      .delete("http://localhost:5000/api/IssueTreatment/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      IssueTreatment: this.state.IssueTreatment.filter((el) => el._id !== id),
    });
  }

  IssueTreatmentList() {
    return this.state.IssueTreatment.map((currentIssueTreatmentDetails) => {
      return (
        <IssueTreatmentDetails
          IssueTreatmentDetails={currentIssueTreatmentDetails}
          deleteIssueTreatmentDetails={this.deleteIssueTreatmentDetails}
          key={currentIssueTreatmentDetails._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Head />
        <br />
        <h1 style={{ textAlign: "center" }}>Issue Treatment Table</h1>
        <br />
        <Table striped bordered hover style={{ backgroundColor: "#A4D8A4" }}>
          <thead style={{ backgroundColor: "#A4D8A4" }}>
            <tr style={{ backgroundColor: "#A4D8A4" }}>
              <th>Issue Treatment Id</th>
              <th>Issue Treatment Name</th>
              <th>Quantity</th>
              <th>date</th>
              <th>Issue To</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.IssueTreatmentList()}</tbody>
        </Table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div>
          <footer
            style={{
              height: "50px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                paddingBottom: "5px",
                backgroundColor: "#128b27",
              }}
            >
              <hr />
              &copy; 2020 copyright: SABH-PK.com
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
