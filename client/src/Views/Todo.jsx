import React, { useEffect, useState } from "react";
import NavComponent from "../Components/NavComponent";
import { Container, Form, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";

const Todo = () => {
  const [clients, setClients] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWaiting, setIswaiting] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();
  const idx = window.localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/clients`, { withCredentials: true })
      .then((res) => {
        console.log("res List", res);
        console.log("res.data List", res.data);
        // setClients(res.data);

        const sortedClients = res.data.sort(
          (a, b) => new Date(a.maintDate) - new Date(b.maintDate)
        );
        setClients(
          sortedClients.filter(
            (client) => client.maintDate >= start && client.maintDate <= end
          )
        );
      })
      .catch((err) => console.log(err));
  }, [start, end]);
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
        // setError({});
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        // setError(err.response.data.errors);
      });
  };
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
  return (
    <div>
      {idx ? (
        <div>
          <NavComponent home={false} />
          <div className="container mx-auto w-auto">
            <h1 className="text-center mb-5">Todo</h1>
            <Container className="mb-5">
              <Row>
                <Col>
                  <Form.Label>Select Period:</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
            <div style={{ overflowX: "auto", height: "400px" }}>
              <Table bordered striped>
                <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <tr className="align-middle">
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
          <NavComponent home={true} />
          <p className="text-center">
            You are not logged in. <Link to="/">Login here</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Todo;
