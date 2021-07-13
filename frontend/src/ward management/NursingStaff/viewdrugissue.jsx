import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./Navbar";
import Footer from "../footer";
import Print from "../ward incharge/pdf";

const DrugIssue = (props) => (
  <tr>
    <td>{props.issueDetails.DateTime}</td>
    <td>{props.issueDetails.name}</td>
    <td>{props.issueDetails.type}</td>
    <td>{props.issueDetails.admission}</td>
    <td>{props.issueDetails.nustaff}</td>
    <td>
      <Button
        variant="success"
        onClick={() => {
          props.deleteDrug(props.issueDetails._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class ViewDIList extends Component {
  constructor(props) {
    super(props);
    this.deleteDrug = this.deleteDrug.bind(this);

    this.state = { drugissuelist: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/issue/")
      .then((response) => {
        this.setState({ drugissuelist: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDrug(id) {
    axios.delete("http://localhost:5000/api/issue/" + id).then((response) => {
      console.log(response.data);
    });
    this.setState({
      drugissuelist: this.state.drugissuelist.filter((el) => el._id !== id),
    });
  }

  DrugIssueWholeList() {
    return this.state.drugissuelist.map((currentdrugissue) => {
      return (
        <DrugIssue
          issueDetails={currentdrugissue}
          deleteDrug={this.deleteDrug}
          key={currentdrugissue._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          className="container"
        >
          <Table striped bordered={false} hover>
            <thead>
              <tr>
                <th>DateTime</th>
                <th>Name</th>
                <th>Type</th>
                <th>Admission</th>
                <th>Nursing Staff ID</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.DrugIssueWholeList()}
              <br />
              <Print />
            </tbody>{" "}
          </Table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ViewDIList;
