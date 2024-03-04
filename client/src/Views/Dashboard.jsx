import React, { useEffect, useState } from "react";
import NavComponent from "../Components/NavComponent";
import axios from "axios";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";

// Functional component for the dashboard page
const Dashboard = () => {
  // State variables for managing client data and completion status
  const [clients, setClients] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWaiting, setIswaiting] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // Get user ID from local storage
  const idx = window.localStorage.getItem("userId");

  // Fetch client data from the server on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/clients`, { withCredentials: true })
      .then((res) => {
        console.log("res List", res);
        console.log("res.data List", res.data);
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to toggle completion status and update color
  const toggleColor = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    axios
      .patch(
        `http://localhost:8000/api/updateClient/${id}`,
        {
          isCompleted,
          isWaiting,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res form", res);
        console.log("res.data form", res.data);
        console.log("isCompleted", res.data.isCompleted);
        console.log("isWaiting", res.data.isWaiting);
        setClients(
          clients.map((client) =>
            client._id === res.data._id ? res.data : client
          )
        );
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  // Event handlers for completion and waiting icons
  const handleCheckmarkClick = (e, id) => {
    e.preventDefault();
    setIsCompleted(!isCompleted);
    setIswaiting(false);
    toggleColor(e, id);
  };

  const handleNoWaitingClick = (e, id) => {
    e.preventDefault();
    setIswaiting(!isWaiting);
    setIsCompleted(false);
    toggleColor(e, id);
  };

  // Function to delete a client
  const deleteClient = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Customer?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/api/deleteClient/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("res Delete", res);
          console.log("res.data Delete", res.data);
          setClients(clients.filter((client) => client._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to sort clients based on selected option
  const Sort = (e) => {
    e.preventDefault();
    const newClients = [...clients]; // Create a new array to avoid modifying the original array
    if (e.target.value === "createdDate") {
      newClients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (e.target.value === "maintDate") {
      newClients.sort((a, b) => new Date(a.maintDate) - new Date(b.maintDate));
    } else if (e.target.value === "state") {
      newClients.sort((a, b) => a.state.localeCompare(b.state));
    } else if (e.target.value === "name") {
      newClients.sort((a, b) => a.name.localeCompare(b.name));
    }
    setClients([...newClients]); // Update the state with the new sorted array
  };

  // JSX structure for the dashboard page
  return (
    <div>
      {idx ? (
        <div>
          {/* Render navigation component for logged-in users */}
          <NavComponent home={false} />
          <div className="container mx-auto w-auto">
            <h2 className="text-center">Dashboard</h2>
            <Container>
              <Row>
                <Col>
                  {/* Button to navigate to the create client page */}
                  <Button
                    variant="warning"
                    className="add-button mb-2"
                    onClick={() => navigate("/customer/create")}
                  >
                    Create New Client
                  </Button>
                </Col>
                <Col xs={3}>
                  {/* Dropdown for sorting clients */}
                  <Form.Select onChange={Sort}>
                    <option value="createdDate">Sorted by Created Date</option>
                    <option value="maintDate">
                      Sorted by Maintenance Date
                    </option>
                    <option value="state">Sorted by State</option>
                    <option value="name">Sorted by Name</option>
                  </Form.Select>
                </Col>
              </Row>
            </Container>
            <div style={{ overflowX: "auto", height: "400px" }}>
              {/* Table displaying client information */}
              <Table bordered striped>
                <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <tr className="align-middle">
                    {/* Table header columns */}
                    <th>Company Installation</th>
                    <th>Phone</th>
                    <th>Name</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Installation Date</th>
                    <th>Maintenance Date</th>
                    <th>Installation Price</th>
                    <th>Last Maintenance Price</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table body with client data */}
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <td
                        style={{
                          backgroundColor: client.isCompleted
                            ? "green"
                            : client.isWaiting
                            ? "orange"
                            : null,
                        }}
                      >
                        {client.installed ? "Prime" : "Strange"}
                      </td>
                      <td>
                        {client.phone1}/{client.phone2}
                      </td>
                      <td>
                        {/* Link to view client details */}
                        <Link to={`/customer/${client._id}`}>
                          {client.name}
                        </Link>
                      </td>
                      <td className="text-nowrap">{client.state}</td>
                      <td className="text-nowrap">{client.city}</td>
                      <td>{new Date(client.instDate).toLocaleDateString()}</td>
                      <td>{new Date(client.maintDate).toLocaleDateString()}</td>
                      <td>{client.instPrice}</td>
                      <td>{client.maintPrice}</td>
                      <td>{client.comment}</td>
                      <td className="justify-content-center">
                        {/* Icons for actions */}
                        <div className="d-flex gap-2">
                          <IoMdCheckmarkCircleOutline
                            onClick={(e) => handleCheckmarkClick(e, client._id)}
                            size="30px"
                            cursor={"pointer"}
                          />
                          <CiNoWaitingSign
                            onClick={(e) => handleNoWaitingClick(e, client._id)}
                            size="30px"
                            cursor={"pointer"}
                          />
                          <BiEdit
                            onClick={(e) =>
                              navigate(`/customer/edit/${client._id}`)
                            }
                            size="30px"
                            cursor={"pointer"}
                          />
                          <MdDeleteForever
                            onClick={(e) => deleteClient(client._id)}
                            size="30px"
                            cursor={"pointer"}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Render navigation component for non-logged-in users */}
          <NavComponent home={true} />
          <p className="text-center">
            You are not logged in. <Link to="/">Login here</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
