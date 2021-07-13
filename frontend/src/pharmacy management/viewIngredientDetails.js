import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Head from "./NavBar";
const IngredientDetails = (props) => (
  <tr>
    <td>{props.ingredientDetails.ingreId}</td>
    <td>{props.ingredientDetails.ingreName}</td>
    <td>{props.ingredientDetails.quantity}</td>
    <td>{props.ingredientDetails.unit}</td>
    <td>
      <Button variant="dark">
        <Link to={"/update_Ingredient/" + props.ingredientDetails._id}>
          update
        </Link>
      </Button>{" "}
      |{" "}
      <Button
        variant="danger"
        href="#"
        onClick={() => {
          props.deleteingredientDetails(props.ingredientDetails._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

export default class ViewIngredient extends Component {
  constructor(props) {
    super(props);

    this.deleteingredientDetails = this.deleteingredientDetails.bind(this);

    this.state = { Ingredient: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/ingredient/")
      .then((response) => {
        this.setState({ Ingredient: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteingredientDetails(id) {
    axios
      .delete("http://localhost:5000/api/ingredient/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      Ingredient: this.state.Ingredient.filter((el) => el._id !== id),
    });
  }

  IngredientList() {
    return this.state.Ingredient.map((currentingredientDetails) => {
      return (
        <IngredientDetails
          ingredientDetails={currentingredientDetails}
          deleteingredientDetails={this.deleteingredientDetails}
          key={currentingredientDetails._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Head />
        <br />
        <h1 style={{ textAlign: "center" }}>Ingredients Table</h1>
        <br />
        <Table striped bordered hover style={{ backgroundColor: "#A4D8A4" }}>
          <thead>
            <tr>
              <th>Ingredient Id</th>
              <th>ingredient Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{this.IngredientList()}</tbody>
        </Table>
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
