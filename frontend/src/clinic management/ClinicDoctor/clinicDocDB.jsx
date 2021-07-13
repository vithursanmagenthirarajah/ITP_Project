import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./clinicDocNav";
import Footer from "../../ward management/footer";

const PatientAdd = (props) => (
  <tr>
    <td>{props.clinicPat.admission}</td>
    <td>{props.clinicPat.name}</td>
    <td>{props.clinicPat.age}</td>
    <td>{props.clinicPat.disease}</td>
    <td>
      <Link to={"/clinicpresc"}>
        <Button variant="success">Add Prescription</Button>
      </Link>
    </td>
    <td>
      <Button
        variant="success"
        onClick={() => {
          props.deleteClinicPat(props.clinicPat._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

class ViewcpList extends Component {
  constructor(props) {
    super(props);

    this.state = { patlist: [] };
    this.deleteClinicPat = this.deleteClinicPat.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/clinic/")
      .then((response) => {
        this.setState({ patlist: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteClinicPat(id) {
    axios.delete("http://localhost:5000/api/clinic/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      patlist: this.state.patlist.filter((el) => el._id !== id),
    });
  }

  PatientWholeList() {
    return this.state.patlist.map((currentpat) => {
      return (
        <PatientAdd
          clinicPat={currentpat}
          deleteClinicPat={this.deleteClinicPat}
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
              <th>Admission</th>
              <th>Name</th>
              <th>Age</th>
              <th>Disease</th>
              <th>Add Prescription</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.PatientWholeList()}</tbody>{" "}
        </Table>
        <Footer />
      </div>
    );
  }
}

export default ViewcpList;
