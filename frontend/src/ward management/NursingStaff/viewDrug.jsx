import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./Navbar";
import Footer from "../footer";
import Print from "../ward incharge/pdf";
const DrugAdd = (props) => (
  <tr>
    <td>{props.drugDetails.drugName}</td>
    <td>{props.drugDetails.type}</td>
    <td>{props.drugDetails.availableQuantity}</td>
    <td>{props.drugDetails.unit}</td>
    <td>
      <Link to={"/updatedrug/" + props.drugDetails._id}>
        <Button variant="success">Edit</Button>
      </Link>{" "}
      |{" "}
      <Button
        variant="success"
        onClick={() => {
          props.deleteDrug(props.drugDetails._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);
class ViewList extends Component {
  constructor(props) {
    super(props);
    this.deleteDrug = this.deleteDrug.bind(this);

    this.state = { druglist: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/drugadd/")
      .then((response) => {
        this.setState({ druglist: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteDrug(id) {
    axios.delete("http://localhost:5000/api/drugadd/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      druglist: this.state.druglist.filter((el) => el._id !== id),
    });
  }

  drugWholeList() {
    return this.state.druglist.map((currentdrug) => {
      return (
        <DrugAdd
          drugDetails={currentdrug}
          deleteDrug={this.deleteDrug}
          key={currentdrug._id}
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
        <br />
        <Table striped bordered={false} hover>
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Type</th>
              <th>Available Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{this.drugWholeList()}</tbody> <br />
          <Print />
        </Table>
        <Footer />
      </div>
    );
  }
}

export default ViewList;
