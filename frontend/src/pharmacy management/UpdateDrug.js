import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Head from "./NavBar";
export default class addDrugs extends Component {
  constructor(props) {
    super(props);

    this.onChangeDrugId = this.onChangeDrugId.bind(this);
    this.onChangeDrugName = this.onChangeDrugName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDrugType = this.onChangeDrugType.bind(this);
    this.onChangeDrugUnit = this.onChangeDrugUnit.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      DrugId: "",
      DrugName: "",
      Quantity: "",
      Type: "",
      Unit: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/drug/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          DrugId: response.data.drugId,
          DrugName: response.data.drugName,
          Quantity: response.data.quantity,
          Type: response.data.type,
          Unit: response.data.unit,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeDrugId(e) {
    this.setState({
      DrugId: e.target.value,
    });
  }

  onChangeDrugName(e) {
    this.setState({
      DrugName: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      Quantity: e.target.value,
    });
  }

  onChangeDrugType(e) {
    this.setState({
      Type: e.target.value,
    });
  }

  onChangeDrugUnit(e) {
    this.setState({
      Unit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const drugDetails = {
      drugId: this.state.DrugId,
      drugName: this.state.DrugName,
      quantity: this.state.Quantity,
      type: this.state.Type,
      unit: this.state.Unit,
    };
    console.log(drugDetails);
    axios
      .post(
        "http://localhost:5000/api/drug/edit/" + this.props.match.params.id,
        drugDetails
      )
      .then((res) => {
        console.log(res.data);
      });

    alert("Drug added successfully");
  }

  render() {
    return (
      <div>
        <Head />
        <h1 style={{ textAlign: "center" }}> Edit Drugs Table </h1>
        <div class="centerX">
          <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formHorizontaldrugID">
              <Form.Label column sm={2}>
                Drug ID:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeDrugId}
                  value={this.state.DrugId}
                  placeholder="Drug ID"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Drug Name:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeDrugName}
                  value={this.state.DrugName}
                  placeholder="Drug Name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalQuantity">
              <Form.Label column sm={2}>
                Quantity:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="number"
                  required
                  onChange={this.onChangeQuantity}
                  value={this.state.Quantity}
                  placeholder="Quantity"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalType">
              <Form.Label column sm={2}>
                Drug Type:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeDrugType}
                  value={this.state.Type}
                  placeholder="Drug Type"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalUnit">
              <Form.Label column sm={2}>
                Unit:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeDrugUnit}
                  value={this.state.Unit}
                  placeholder="Unit"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" variant="success">
                  UPDATE
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
