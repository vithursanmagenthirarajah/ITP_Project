import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./AttendantNav";
import Footer from "../footer";
import Print from "../ward incharge/pdf";

const DietView = (props) => (
  <tr>
    <td>{props.issueDiet.DateTime}</td>
    <td>{props.issueDiet.issuedDiet}</td>
    <td>{props.issueDiet.admission}</td>
    <td>{props.issueDiet.waID}</td>
    <td>
      <Link to={"/updatediet/" + props.issueDiet._id}>
        <Button variant="success">Edit</Button>
      </Link>{" "}
      |{" "}
      <Button
        variant="success"
        onClick={() => {
          props.deleteDiet(props.issueDiet._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class ViewDietList extends Component {
  constructor(props) {
    super(props);
    this.deleteDiet = this.deleteDiet.bind(this);

    this.state = { dietList: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/warddiet/")
      .then((response) => {
        this.setState({ dietList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDiet(id) {
    axios
      .delete("http://localhost:5000/api/warddiet/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      dietList: this.state.dietList.filter((el) => el._id !== id),
    });
  }

  dietWholeList() {
    return this.state.dietList.map((currentdiet) => {
      return (
        <DietView
          issueDiet={currentdiet}
          deleteDiet={this.deleteDiet}
          key={currentdiet._id}
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
              <th>Date and Time</th>
              <th>Issued Diet Type</th>
              <th>Admission</th>
              <th>Ward Attendant ID</th>
            </tr>
          </thead>
          <tbody>
            {this.dietWholeList()}
            <br />
            <Print />
          </tbody>{" "}
        </Table>
        <Footer />
      </div>
    );
  }
}

export default ViewDietList;
