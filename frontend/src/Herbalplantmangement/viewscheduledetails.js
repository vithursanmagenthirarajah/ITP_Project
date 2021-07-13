import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";
import axios from "axios";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Schedule = (props) => (
  <tr>
    <td style={{ border: "1px solid black" }}>{props.schedule.Taskid}</td>
    <td style={{ border: "1px solid black" }}>{props.schedule.Name}</td>
    <td style={{ border: "1px solid black" }}>{props.schedule.Datetimefrom}</td>
    <td style={{ border: "1px solid black" }}>{props.schedule.Datetimeto}</td>
    <td style={{ border: "1px solid black" }}>{props.schedule.Empid}</td>
    <td style={{ border: "1px solid black" }}>{props.schedule.State}</td>

    <td style={{ border: "1px solid black" }}>
      <Link to={"schedule/update/" + props.schedule._id}>update</Link> |
      <button
        style={{
          background: "none!important",
          border: "none",
          padding: "0!important",
          fontFamily: "arial, sans-serif",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => {
          props.deleteSchedule(props.schedule._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const SchedulePdf = (props) => (
  <tr>
    <td style={{ border: "1px solid black" }}> {props.schedule.Name} </td>
    <td style={{ border: "1px solid black" }}>
      {" "}
      {props.schedule.Datetimefrom}{" "}
    </td>
    <td style={{ border: "1px solid black" }}> {props.schedule.Datetimeto} </td>
    <td style={{ border: "1px solid black" }}> {props.schedule.Empid} </td>
    <td style={{ border: "1px solid black" }}> {props.schedule.State} </td>
  </tr>
);

export default class viewscheduledetails extends Component {
  constructor(props) {
    super(props);

    this.deleteSchedule = this.deleteSchedule.bind(this);

    this.state = { schedules: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/schedule/")
      .then((response) => {
        this.setState({ schedules: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSchedule(id) {
    axios
      .delete("http://localhost:5000/api/schedule/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      schedules: this.state.schedules.filter((el) => el._id !== id),
    });
  }

  scheduleList() {
    return this.state.schedules.map((currentschedule) => {
      return (
        <Schedule
          schedule={currentschedule}
          deleteSchedule={this.deleteSchedule}
          key={currentschedule._id}
        />
      );
    });
  }

  scheduleListPdf() {
    return this.state.schedules.map((currentschedule) => {
      return (
        <SchedulePdf
          schedule={currentschedule}
          deleteSchedule={this.deleteSchedule}
          key={currentschedule._id}
        />
      );
    });
  }

  printDocument = () => {
    document.getElementById("tableData").style.display = "none";
    document.getElementById("divToPrint").style.display = "block";

    if (document.getElementById("divToPrint").style.display === "block") {
      const input = document.getElementById("divToPrint");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">ScheduleDetails</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="/">DashBoard</Nav.Link>
                <NavDropdown title="ViewDetails" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/viewplant">Plant</NavDropdown.Item>
                  <NavDropdown.Item href="/viewSchedule">
                    Schedule
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Button
                style={{ backgroundColor: "#006600" }}
                variant="outline-info"
              >
                Logout
              </Button>
            </Container>
          </Navbar>
          <br />
        </div>
        <br />

        <h3 className="center3">Schedule Details</h3>
        <hr />
        <div id="tableData">
          <Table striped bordered hover style={{ border: "1px solid black" }}>
            <thead className="thead-light">
              <tr>
                <th style={{ border: "1px solid black" }}>taskId</th>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>dateTimeFrom</th>
                <th style={{ border: "1px solid black" }}>dateTimeTo</th>
                <th style={{ border: "1px solid black" }}>Employee</th>
                <th style={{ border: "1px solid black" }}>state</th>
                <th style={{ border: "1px solid black" }}>Actions</th>
              </tr>
            </thead>
            <tbody>{this.scheduleList()}</tbody>
          </Table>
        </div>

        <div id="divToPrint" style={{ display: "none" }}>
          <table style={{ border: "1px solid black" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>dateTimeFrom</th>
                <th style={{ border: "1px solid black" }}>dateTimeTo</th>
                <th style={{ border: "1px solid black" }}>Employee</th>
                <th style={{ border: "1px solid black" }}>state</th>
              </tr>
            </thead>
            <tbody>{this.scheduleListPdf()}</tbody>
          </table>
        </div>

        <div>
          <div>
            <button
              style={{ backgroundColor: "#66ff66", borderRadius: "10px" }}
              onClick={this.printDocument}
            >
              Print Report
            </button>
          </div>
          <div className="mt4"></div>
        </div>

        <div>
          <footer
            style={{
              height: "50px",
              position: "fixed",
              left: "0",
              bottom: "0",
              width: "100%",
              textAlign: "center",
              padding: "3px",
              backgroundColor: "rgb(24, 43, 21)",
              color: "white",
            }}
          >
            <div>&copy; 2020 copyright: SABH-PK.com</div>
          </footer>
        </div>
      </div>
    );
  }
}
