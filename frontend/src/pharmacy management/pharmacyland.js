import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import addD from "./pictures/images2.jpg";
import addI from "./pictures/image3.jpg";
import issueDI from "./pictures/imagesissue.jpg";
import searchM from "./pictures/images5.jpg";
import ayur from "./pictures/download.jpg";
import { Link } from "react-router-dom";
import Head from "./NavBar";
import ingre from "./pictures/ingre.jpg";

export default class pharmacyland extends Component {
  render() {
    return (
      <div width="100%">
        <Head />
        <br />
        <div class="containerX" style={{ margin: "auto", width: "50%" }}>
          <div>
            <div>
              <h1 style={{ textAlign: "center", fontSize: 70 }}> Pharmacy </h1>
              <br />
              <br />
              <div style={{ justifyContent: "center", display: "flex" }}>
                <table>
                  <td>
                    <Card className="card1" style={{ width: "18rem" }}>
                      <Card.Img
                        src={addD}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>Add Drugs</Card.Title>
                        <Card.Text>to add drugs items</Card.Text>
                        <Link to="/AddDrugs">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>

                  <td>
                    <Card className="card4" style={{ width: "18rem" }}>
                      <Card.Img
                        src={issueDI}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>Issue treatment items</Card.Title>
                        <Card.Text>to issue drugs and ingredients</Card.Text>
                        <Link to="/issueTreatmentitems">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>

                  <td>
                    <Card className="card3" style={{ width: "18rem" }}>
                      <Card.Img
                        src={addI}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>Add indredients</Card.Title>
                        <Card.Text>to add ingredients items</Card.Text>
                        <Link to="/AddIngredients">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>
                </table>
              </div>
              <br />
              <br />
              <div style={{ justifyContent: "center", display: "flex" }}>
                <table>
                  <td>
                    <Card className="card5" style={{ width: "18rem" }}>
                      <Card.Img
                        src={searchM}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>View Drugs</Card.Title>
                        <Card.Text>to view and update in drug table</Card.Text>
                        <Link to="/ViewDrug">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>

                  <td>
                    <Card className="card6" style={{ width: "18rem" }}>
                      <Card.Img
                        src={ingre}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>View Treatment Items</Card.Title>
                        <Card.Text>to view issued treatments</Card.Text>
                        <Link to="/viewTreatmentitems">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>

                  <td>
                    <Card className="card6" style={{ width: "18rem" }}>
                      <Card.Img
                        src={ayur}
                        alt="user"
                        height="100"
                        width="100"
                      />
                      <Card.Body>
                        <Card.Title>View Ingredients</Card.Title>
                        <Card.Text>to view and update in ingredients</Card.Text>
                        <Link to="/ViewIngredient">
                          <Button variant="success" size="lg" block>
                            click
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </td>
                </table>

                <br />
                <br />
                <br />
                <br />
                <br></br>
              </div>
            </div>
          </div>
        </div>
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
// <Link to="/AddDrugs"><Button variant="primary">click</Button></Link>
