import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const Check = () => {
  return (
    <div>
      <Card className="dcd">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Clinic Patient Details</Card.Title>
          <Card.Text>
            <Table>
              <tbody className="font">
                <tr>
                  <td style={{ width: "30%" }}>Patient Name</td>
                  <td className="margin">Kamal</td>
                </tr>

                <tr>
                  <td className="font">Gender</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>DOB</td>
                  <td>1999-11-14</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>OPD</td>
                </tr>
                <tr>
                  <td>Consulted Doctor</td>
                  <td>Dr.Vasoolraja</td>
                </tr>
                <tr>
                  <td>Treatment plan</td>
                  <td>Veg</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
          <Button variant="primary">Add Prescription</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Check;
