import React from "react";
import water3 from "../Assets/water3.jpg";
import {
  Navbar,
  Nav,
  // NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavComponent = (props) => {
  const {home} = props;
  const navigate = useNavigate();
  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/api/logoutUser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        window.localStorage.removeItem("userId");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundImage: `url(${water3})` }}
        className=" shadow p-3 mb-5 bg-body-tertiary rounded"
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            className="fw-bolder fs-0 text-primary-emphasis me-5"
          >
            PROJECT MANAGER
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-5 me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="fw-medium" onClick={()=> navigate("/dashboard")}>
                Dashboard
              </Nav.Link>
              <Nav.Link  className="fw-medium" onClick={()=> navigate("/performances")}>
                Performance
              </Nav.Link>
              <Nav.Link className="fw-medium" onClick={()=> navigate("/todo")}>Todo
              </Nav.Link>
              <Nav.Link className="fw-medium" onClick={()=> navigate("/about")}>
                About
              </Nav.Link>
              <Nav.Link className="fw-medium" onClick={()=> navigate("/contact")}>
                Contact
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="primary" className="me-4">
                Search
              </Button>
              {home === true ? (
                <div className="d-flex">
                  <Button
                    variant="outline-primary"
                    className="me-1"
                    onClick={() => navigate("/")}
                    >
                    Login
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="text-text-decoration-none"
                    onClick={() => navigate("/register")}
                    >
                    Register
                  </Button>
                </div>
              ) : (
                <Button
                variant="outline-primary"
                className="me-1"
                onClick={logoutUser}
                >
                  Logout
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComponent;
