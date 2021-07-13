import React, { Component } from "react";
import "../App.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./NavBar";
import Printpdf from "./Print"

const EmpDuty = (props) => (
  <tr>
    <td>{props.empDuty.sID}</td>
    <td>{props.empDuty.dateTimeFrom}</td>
    <td>{props.empDuty.dateTimeTo}</td>
    <td>{props.empDuty.employee}</td>
    <td>{props.empDuty.monthlySchedule}</td>

    <td>
      <Link to={"/updateemployeeduty/" + props.empDuty._id}>update</Link> |{" "}
      <button
        style={{
          background: "none!important",
          border: "none",
          padding: "0!important",
          fontFamily: "arial, sans-serif",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.preventDefault()
          let ok = window.confirm("do you want to delete??")
          if (ok){
          props.deleteempDuty(props.empDuty._id);
          }
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

export default class viewEmployeeDuty extends Component {
  constructor(props) {
    super(props);

    this.deleteempDuty = this.deleteempDuty.bind(this);

    this.state = { empDuty1: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/individualSchedule/")
      .then((response) => {
        this.setState({ empDuty1: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteempDuty(id) {
    axios
      .delete("http://localhost:5000/api/individualSchedule/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      empDuty1: this.state.empDuty1.filter((el) => el._id !== id),
    });
  }

  empDutyList() {
    return this.state.empDuty1.map((currentempDuty) => {
      return (
        <EmpDuty
          empDuty={currentempDuty}
          deleteempDuty={this.deleteempDuty}
          key={currentempDuty._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Header />
        <h1 style={{ justifyContent: "center", display: "flex" }}>
          Employees duty list
        </h1>
        <Table striped bordered hover style={{ backgroundColor: "#A4D8A4" }}>
          <thead>
            <tr>
              <th>SID</th>

              <th>Date&time from</th>
              <th>Date&time to</th>
              <th>employee</th>
              <th>monthly Schedule</th>
              <th>operations</th>
            </tr>
          </thead>
          <tbody>{this.empDutyList()}</tbody>
        </Table>
        <Printpdf/>
        <div>
          <footer
            style={{
              height: "50px",
              marginTop: "400px",
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
