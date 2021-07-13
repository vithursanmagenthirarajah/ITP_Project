import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Head from "./NavBar";
const Drug = (props) => (
  <tr>
    <td>{props.drug.drugId}</td>
    <td>{props.drug.drugName}</td>
    <td>{props.drug.quantity}</td>
    <td>{props.drug.type}</td>
    <td>{props.drug.unit}</td>
    <td>
      <Button variant="dark">
        {" "}
        <Link to={"/edit/" + props.drug._id}>edit</Link>{" "}
      </Button>{" "}
      |{" "}
      <Button
        variant="danger"
        href="#"
        onClick={() => {
          props.deleteDrug(props.drug._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

export default class ViewDrug extends Component {
  constructor(props) {
    super(props);

    this.deleteDrug = this.deleteDrug.bind(this);

    this.state = { drug: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/drug/")
      .then((response) => {
        this.setState({ drug: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDrug(drugId) {
    axios
      .delete("http://localhost:5000/api/drug/" + drugId)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      drug: this.state.drug.filter((el) => el._id !== drugId),
    });
  }

  DrugList() {
    return this.state.drug.map((currentDrug) => {
      return (
        <Drug
          drug={currentDrug}
          deleteDrug={this.deleteDrug}
          key={currentDrug.drugId}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Head />
        <br />
        <h1 style={{ textAlign: "center" }}>Drugs Table</h1>
        <br />
        <Table striped bordered hover style={{ backgroundColor: "#A4D8A4" }}>
          <thead>
            <tr>
              <th>Drug Id</th>
              <th>Drug Name</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{this.DrugList()}</tbody>
        </Table>

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
