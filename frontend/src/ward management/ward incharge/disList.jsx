import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./wardinchNav";
import Footer from "../footer";
import Print from "./pdf";

const DischargeView = (props) => (
  <tr>
    <td>{props.discharge1.name}</td>
    <td>{props.discharge1.DateTime}</td>
    <td>{props.discharge1.Diagnosis}</td>
    <td>{props.discharge1.afterTreatment}</td>
    <td>{props.discharge1.DOD}</td>
    <td>{props.discharge1.durationofresidence}</td>
    <td>{props.discharge1.cured}</td>
    <td>{props.discharge1.remarks}</td>
    <td>{props.discharge1.chargename}</td>

    <td>
      <Button
        variant="success"
        onClick={() => {
          props.deleteDischarge(props.discharge1._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class DischargeList extends Component {
  constructor(props) {
    super(props);
    this.deleteDischarge = this.deleteDischarge.bind(this);

    this.state = { dischargeList: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/discharge/")
      .then((response) => {
        this.setState({ dischargeList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDischarge(id) {
    axios
      .delete("http://localhost:5000/api/discharge/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      dischargeList: this.state.dischargeList.filter((el) => el._id !== id),
    });
  }

  dischargeWholeList() {
    return this.state.dischargeList.map((currentdischarge) => {
      return (
        <DischargeView
          discharge1={currentdischarge}
          deleteDischarge={this.deleteDischarge}
          key={currentdischarge._id}
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
              <th>Name</th>
              <th>DateTime</th>
              <th>Diagnosis</th>
              <th>afterTreatment</th>
              <th>DOD</th>
              <th>durationofresidence</th>
              <th>cured</th>
              <th>remarks</th>
              <th>chargename</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.dischargeWholeList()}
            <br />
            <Print />
          </tbody>{" "}
        </Table>
        <Footer />
      </div>
    );
  }
}

export default DischargeList;
