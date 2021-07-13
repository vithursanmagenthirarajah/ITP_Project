import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Header from "./Navbar";
import Button from "react-bootstrap/esm/Button";
import Footer from "../footer";

export default class EditDrug extends Component {
  constructor(props) {
    super(props);

    this.onChangeDname = this.onChangeDname.bind(this);
    this.onChangeDtype = this.onChangeDtype.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      drugName: "",
      type: "",
      availableQuantity: "",
      unit: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/drugadd/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          drugName: response.data.drugName,
          type: response.data.type,
          availableQuantity: response.data.availableQuantity,
          unit: response.data.unit,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeDname(e) {
    this.setState({
      drugName: e.target.value,
    });
  }
  onChangeDtype(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeQuantity(e) {
    this.setState({
      availableQuantity: e.target.value,
    });
  }
  onChangeUnit(e) {
    this.setState({
      unit: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const drugDetails = {
      drugName: this.state.drugName,
      type: this.state.type,
      availableQuantity: this.state.availableQuantity,
      unit: this.state.unit,
    };

    console.log(drugDetails);

    axios
      .post(
        "http://localhost:5000/api/drugadd/update/" +
          this.props.match.params.id,
        drugDetails
      )
      .then((res) => console.log(res.data));

    window.location = "/druglist";
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Card className="editcard">
          <Card.Header>Welcome Nursing Staff</Card.Header>
          <Card.Body>
            <Card.Title>Drug Edit Form</Card.Title>
            <Card.Text>
              <form className="editform" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>drugName </label>
                  <input
                    ref="userInput"
                    required
                    className="form-control"
                    value={this.state.drugName}
                    onChange={this.onChangeDname}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Type </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.type}
                    onChange={this.onChangeDtype}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.availableQuantity}
                    onChange={this.onChangeQuantity}
                  />
                </div>
                <div className="form-group">
                  <label>Unit </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.unit}
                    onChange={this.onChangeUnit}
                  />
                </div>

                <div className="form-group">
                  <Button variant="success" type="submit">
                    Update Drug
                  </Button>
                </div>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>
        <Footer />
      </div>
    );
  }
}
