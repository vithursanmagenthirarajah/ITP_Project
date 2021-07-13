import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./wardDocNav";
import Footer from "../footer";
import Print from "../ward incharge/pdf";

const VisitView = (props) => (
  <tr>
    <td>{props.visit.name}</td>
    <td>{props.visit.datetime}</td>
    <td>{props.visit.reading}</td>
    <td>{props.visit.treatment}</td>
    <td>{props.visit.dietplan}</td>
    <td>{props.visit.admission}</td>
    <td>{props.visit.warddoctor}</td>
    <td>{props.visit.remarks}</td>
    <td>{props.visit.chargename}</td>

    <td>
      <Button
        variant="success"
        onClick={() => {
          props.deleteView(props.visit._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

class VisitLisit extends Component {
  constructor(props) {
    super(props);
    this.deleteView = this.deleteView.bind(this);

    this.state = { viewList: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/wardvisit/")
      .then((response) => {
        this.setState({ viewList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteView(id) {
    axios
      .delete("http://localhost:5000/api/wardvisit/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      viewList: this.state.viewList.filter((el) => el._id !== id),
    });
  }

  dischargeWholeList() {
    return this.state.viewList.map((currentVisit) => {
      return (
        <VisitView
          visit={currentVisit}
          deleteView={this.deleteView}
          key={currentVisit._id}
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
              <th>Reading</th>
              <th>Treatment</th>
              <th>DietPlan</th>
              <th>Admission</th>
              <th>Warddoctor</th>
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

export default VisitLisit;
