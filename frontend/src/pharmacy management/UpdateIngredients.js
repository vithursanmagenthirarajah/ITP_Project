import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Head from "./NavBar";
export default class addIngredients extends Component {
  constructor(props) {
    super(props);

    this.onChangeIngreId = this.onChangeIngreId.bind(this);
    this.onChangeIngreName = this.onChangeIngreName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ingreId: "",
      ingreName: "",
      quantity: "",
      unit: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/ingredient/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          ingreId: response.data.ingreId,
          ingreName: response.data.ingreName,
          quantity: response.data.quantity,
          unit: response.data.unit,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeIngreId(e) {
    this.setState({
      ingreId: e.target.value,
    });
  }

  onChangeIngreName(e) {
    this.setState({
      ingreName: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeUnit(e) {
    this.setState({
      unit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const ingredientDetails = {
      ingreId: this.state.ingreId,
      ingreName: this.state.ingreName,
      quantity: this.state.quantity,
      unit: this.state.unit,
    };

    console.log(ingredientDetails);

    axios
      .post("http://localhost:5000/api/ingredient/add", ingredientDetails)
      .then((res) => {
        console.log(res.data);
      });

    alert("Ingredient Updated successfully!");
  }
  render() {
    return (
      <div>
        <Head />
        <h1 style={{ textAlign: "center" }}> Edit Ingredients </h1>
        <br />
        <br />
        <div class="centerX">
          <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formHorizontalIngredientID">
              <Form.Label column sm={2}>
                Ingredient ID:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeIngreId}
                  value={this.state.ingreId}
                  placeholder="Ingredient ID"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Ingredient Name:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeIngreName}
                  value={this.state.ingreName}
                  placeholder="Ingredient Name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalQuantity">
              <Form.Label column sm={2}>
                Unit:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  required
                  onChange={this.onChangeUnit}
                  value={this.state.unit}
                  placeholder="Unit"
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
                  value={this.state.quantity}
                  placeholder="Quantity"
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
