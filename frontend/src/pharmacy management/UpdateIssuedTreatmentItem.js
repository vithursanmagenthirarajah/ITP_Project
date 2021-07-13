import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Head from "./NavBar";
import axios from "axios";

export default class IssueTreatmentItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeTreatId = this.onChangeTreatId.bind(this);
    this.onChangeTreatName = this.onChangeTreatName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeIssueTo = this.onChangeIssueTo.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      treatid: "",
      treatname: "",
      quantity: "",
      date: "",
      issueto: "",
      type: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/IssueTreatment/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          treatid: response.data.treatid,
          treatname: response.data.treatname,
          quantity: response.data.quantity,
          date: response.data.date,
          issueto: response.data.issueto,
          type: response.data.type,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeTreatId(e) {
    this.setState({
      treatid: e.target.value,
    });
  }

  onChangeTreatName(e) {
    this.setState({
      treatname: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeIssueTo(e) {
    this.setState({
      issueto: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const IssueTreatmentDetails = {
      treatid: this.state.treatid,
      treatname: this.state.treatname,
      quantity: this.state.quantity,
      date: this.state.date,
      issueto: this.state.issueto,
      type: this.state.type,
    };
    console.log(IssueTreatmentDetails);
    axios
      .post(
        "http://localhost:5000/api/IssueTreatment/update/" +
          this.props.match.params.id,
        IssueTreatmentDetails
      )
      .then((res) => {
        console.log(res.data);
      });

    alert("issued treatment Updated successfully");
  }

  render() {
    return (
      <div>
        <Head />
        <h1 style={{ textAlign: "center" }}> Update Issued Treatment Items </h1>
        <br />
        <br />
        <div class="centerX">
          <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formHorizontaltreatmentID">
              <Form.Label column sm={2}>
                Treatment ID:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeTreatId}
                  value={this.state.treatid}
                  placeholder="Treatment ID"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Treatment Item Name:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeTreatName}
                  value={this.state.treatname}
                  placeholder="Treatment Item Name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalQuantity">
              <Form.Label column sm={2}>
                Quantity:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  required
                  onChange={this.onChangeQuantity}
                  value={this.state.quantity}
                  placeholder="Quantity"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalDate">
              <Form.Label column sm={2}>
                Issue Date:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  required
                  onChange={this.onChangeDate}
                  value={this.state.date}
                  placeholder="Issue date"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalIssueto">
              <Form.Label column sm={2}>
                Issue To:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeIssueTo}
                  value={this.state.issueto}
                  placeholder="Issue to"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalType">
              <Form.Label column sm={2}>
                Type:
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeType}
                  value={this.state.type}
                  placeholder="type"
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
