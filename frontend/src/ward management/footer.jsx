import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar
          fixed="bottom"
          style={{
            width: "100%",
            marginLeft: "0px",
            backgroundColor: "#008712",
            marginRight: "15px",
          }}
        >
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
        </Navbar>
      </div>
    );
  }
}

export default Footer;
