import React, { useState, useEffect } from "react";
import NavComponent from "../Components/NavComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Tab, Row, Col, Nav, ProgressBar } from "react-bootstrap";
import { MdOutlineCheck } from "react-icons/md";

const ShowOne = () => {

  const [client, setclient] = useState({});
  const { id } = useParams();

  // useEffect hook to fetch details of the product when the component mounts
  useEffect(() => {
    console.log("id-details:", id);
    axios
      .get(`http://localhost:8000/api/getOneClient/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // Successful response from the server
        console.log("res.data one product:", res.data);
        // Set the product details to the state variable
        setclient(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      <NavComponent home={false} />
      <h1 className="text-center mb-5">View Customer Sheet</h1>
      <div className="container mx-auto w-auto">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Customer Informations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Journal</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Expense Report</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <h4><span className="text-light-emphasis fw-normal">Name: </span>{client.name}</h4>
                <h4><span className="text-light-emphasis fw-normal">Phone Number: </span>{client.phone1} / {client.phone2}</h4>
                <h4><span className="text-light-emphasis fw-normal">Location: </span>{client.state} - {client.city}</h4>
                <h4><span className="text-light-emphasis fw-normal">Mark: </span>{client.mark} / {client.withPump?"With Pump":"Without Pump"} / {client.installed?"Company Installations":"Not Company Installations"}</h4>
                <h4><span className="text-light-emphasis fw-normal">Installation Date: </span>{new Date(client.instDate).toLocaleDateString()}</h4>
                <h4><span className="text-light-emphasis fw-normal">Maintenance Date: </span>{new Date(client.maintDate).toLocaleDateString()}</h4>
                <h4><span className="text-light-emphasis fw-normal">Comments: </span>{client.comment}</h4>
                <h4><span className="text-light-emphasis fw-normal">Consumables and Spare Parts: </span></h4>
                <div className="d-flex gap-2">
                <h4>{client.pump?(<span><MdOutlineCheck />Pump</span>):null}</h4>
                <h4>{client.faucet?(<span><MdOutlineCheck />Faucet</span>):null}</h4>
                <h4>{client.t33?(<span><MdOutlineCheck />T33</span>):null}</h4>
                <h4>{client.membrane?(<span><MdOutlineCheck />Membrane</span>):null}</h4>
                <h4>{client.filter?(<span><MdOutlineCheck />Filters</span>):null}</h4>
                <h4>{client.van?(<span><MdOutlineCheck />Van</span>):null}</h4>
                <h4>{client.charger?(<span><MdOutlineCheck />Charger</span>):null}</h4>
                <h4>{client.bp?(<span><MdOutlineCheck />BP</span>):null}</h4>
                <h4>{client.hp?(<span><MdOutlineCheck />HP</span>):null}</h4>
                <h4>{client.shut?(<span><MdOutlineCheck />Shut</span>):null}</h4>
                <h4>{client.valve?(<span><MdOutlineCheck />Valve</span>):null}</h4>
                <h4>{client.tank?(<span><MdOutlineCheck />Tank</span>):null}</h4>
                </div>
                <h4><span className="text-light-emphasis fw-normal">TDS: </span></h4>
                <ProgressBar now={client.tds*0.111} label={`${client.tds} PPM`} />
                {/* <h4>{client.tds?(<span><MdOutlineCheck />TDS</span>):null}</h4>
                <h4>{client.installed?(<span><MdOutlineCheck />Installed</span>):null}</h4> */}
              


              </Tab.Pane>
              <Tab.Pane eventKey="second">Coming Soon. We are working on some awesome things you can look forward to. Stay tuned!</Tab.Pane>
              <Tab.Pane eventKey="third">Coming Soon. We are working on some awesome things you can look forward to. Stay tuned!</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </div>
    </div>
  );
};

export default ShowOne;
