import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userdbtoke");
    navigate("/");
  }

  function packagelist() {
    navigate("/admin/packagelist");
  }
  function customlist() {
    navigate("/admin/customlist");
  }
  function categorylist(){
    navigate("/admin/categorylist");
  }

  function orders(){
    navigate("/admin/orderlist")
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            
            <Nav.Link href="/admin/home" style={{ color: " rgb(186, 12, 12)" }}>
              user
            </Nav.Link>
            <Nav.Link onClick={orders}  style={{ color: " rgb(186, 12, 12)" }}>
              Orders
            </Nav.Link>
            <Nav.Link
              onClick={customlist}
              style={{ color: " rgb(186, 12, 12)" }}
            >
              Custom List
            </Nav.Link>
            <NavDropdown title="Package" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={packagelist}>
                Package List
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categorylist}>
                Category List
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Button variant="Nooutline-danger" class="bttn" onClick={Logout}>
              Logout
            </Button>
          </Nav>

          <h1 class="header" style={{ marginRight: "45%" }}>
            Cater<span class="ninja">Ninja</span>
          </h1>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
