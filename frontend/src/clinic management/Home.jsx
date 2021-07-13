import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import user from "./photo/admin.jpg";

class Card1 extends Component {
  render() {
    return (
      <div>
        <Card className="cd">
          <Card.Body>
            <table>
              <tbody>
                <tr>
                  <td width="auto">
                    <img src={user} alt="user" height="100" width="100" />
                  </td>

                  <td width="70%">
                    <table>
                      <tr>
                        <td>Name</td>
                        <td>Kamal</td>
                      </tr>
                      <tr>
                        <td>Disease</td>
                        <td>Dengue</td>
                      </tr>
                    </table>
                  </td>

                  <td width="20%">
                    <center>
                      <Button as="input" type="button" value="View" />{" "}
                    </center>
                  </td>

                  <td width="30%">
                    <center>
                      <Button as="input" type="button" value="Visit" />{" "}
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Card1;
