import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "./wardinchNav";
import Footer from "../footer";
import Print from "./pdf";

const TransferView = (props) => (
  <tr>
    <td>{props.transferForm.name}</td>
    <td>{props.transferForm.DateTime}</td>
    <td>{props.transferForm.to}</td>
    <td>{props.transferForm.DOT}</td>
    <td>{props.transferForm.suggestedTreatment}</td>
    <td>{props.transferForm.durationofresidence}</td>
    <td>{props.transferForm.reason}</td>
    <td>{props.transferForm.report}</td>
    <td>{props.transferForm.wardinch}</td>

    <td>
      <Button
        variant="success"
        onClick={() => {
          props.deleteTransferr(props.transferForm._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class TransferList extends Component {
  constructor(props) {
    super(props);
    this.deleteTransferr = this.deleteTransferr.bind(this);

    this.state = { transferList: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/transfer/")
      .then((response) => {
        this.setState({ transferList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTransferr(id) {
    axios
      .delete("http://localhost:5000/api/transfer/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      transferList: this.state.transferList.filter((el) => el._id !== id),
    });
  }

  transferWholeList() {
    return this.state.transferList.map((currenttransfer) => {
      return (
        <TransferView
          transferForm={currenttransfer}
          deleteTransferr={this.deleteTransferr}
          key={currenttransfer._id}
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
              <th>to</th>
              <th>DOT</th>
              <th>suggestedTreatment</th>
              <th>durationofresidence</th>
              <th>reason</th>
              <th>report</th>
              <th>wardinch</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.transferWholeList()}
            <br />
            <Print />
          </tbody>{" "}
        </Table>
        <Footer />
      </div>
    );
  }
}

export default TransferList;
