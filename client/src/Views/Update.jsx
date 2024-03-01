import React, { useEffect, useState } from "react";
import NavComponent from "../Components/NavComponent";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FloatingLabel,
  Container,
  Button,
  } from "react-bootstrap";

const Update = () => {
  const [name, setName] = useState("");
  const [phone1, setPhone1] = useState(0);
  const [phone2, setPhone2] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [instDate, setInstDate] = useState("");
  const [maintDate, setMaintDate] = useState("");
  const [instPrice, setInstPrice] = useState(0);
  const [maintPrice, setMaintPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [mark, setMark] = useState("ProfinePlus");
  const [withPump, setWithPump] = useState(false);
  const [pump, setPump] = useState(false);
  const [van, setVan] = useState(false);
  const [filter, setFilter] = useState(false);
  const [charger, setCharger] = useState(false);
  const [bp, setBp] = useState(false);
  const [hp, setHp] = useState(false);
  const [shut, setShut] = useState(false);
  const [valve, setValve] = useState(false);
  const [tank, setTank] = useState(false);
  const [faucet, setFaucet] = useState(false);
  const [t33, setT33] = useState(false);
  const [membrane, setMembrane] = useState(false);
  const [tds, setTds] = useState(false);
  const [installed, setInstalled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getOneClient/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        setPhone1(res.data.phone1);
        setPhone2(res.data.phone2);
        setState(res.data.state);
        setCity(res.data.city);
        setInstDate(res.data.instDate);
        setMaintDate(res.data.maintDate);
        setInstPrice(res.data.instPrice);
        setMaintPrice(res.data.maintPrice);
        setComment(res.data.comment);
        setMark(res.data.mark);
        setWithPump(res.data.withPump);
        setPump(res.data.pump);
        setVan(res.data.van);
        setFilter(res.data.filter);
        setCharger(res.data.charger);
        setBp(res.data.bp);
        setHp(res.data.hp);
        setShut(res.data.shut);
        setValve(res.data.valve);
        setTank(res.data.tank);
        setFaucet(res.data.faucet);
        setT33(res.data.t33);
        setMembrane(res.data.membrane);
        setTds(res.data.tds);
        setInstalled(res.data.installed);
      })
      .catch((err) => console.log(err));
  }, [id]); // Dependency array to run the effect only when 'id' changes

  // Function to update a product
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:8000/api/updateClient/${id}`,
        {
          name,
          phone1,
          phone2,
          state,
          city,
          instDate,
          maintDate,
          instPrice,
          maintPrice,
          comment,
          mark,
          withPump,
          pump,
          van,
          filter,
          charger,
          bp,
          hp,
          shut,
          valve,
          tank,
          faucet,
          t33,
          membrane,
          tds,
          installed,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("updated data: ", res.data);
        navigate("/dashboard");
        setError({});
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.errors);
      });
  };
  return (
    <div>
      
      <NavComponent home={false} />
      <h1 className="text-center mb-5">Edit Customer Sheet</h1>
      <form onSubmit={onSubmitHandler} className="mx-auto w-75">
        <Container>
          <Row>
            <Col xs={6}>
              <fieldset>
                <legend>General Informations</legend>
                <Row className="mb-3">
                  <Col xs="auto">
                    <Form.Control
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                    {error.name ? (
                      <p className="text-danger">{error.name.message}</p>
                    ) : null}
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Phone 1"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      type="number"
                    />
                    {error.phone1 ? (
                      <p className="text-danger">{error.phone1.message}</p>
                    ) : null}
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Phone 2"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="auto">
                    <Form.Control
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                    />
                    {error.state ? (
                      <p className="text-danger">{error.state.message}</p>
                    ) : null}
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                    />
                    {error.city ? (
                      <p className="text-danger">{error.city.message}</p>
                    ) : null}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="auto">
                    <Form.Label>Installation Date/Price:</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="date"
                        value={instDate}
                        onChange={(e) => setInstDate(e.target.value)}
                      />
                      <Form.Control
                        type="number"
                        placeholder="Installation Price"
                        value={instPrice}
                        onChange={(e) => setInstPrice(e.target.value)}
                      />
                      <InputGroup.Text>Dinars</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <Form.Label>Maintenance Date/Price:</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="date"
                        value={maintDate}
                        onChange={(e) => setMaintDate(e.target.value)}
                      />
                      <Form.Control
                        type="number"
                        placeholder="Maintenance Price"
                        value={maintPrice}
                        onChange={(e) => setMaintPrice(e.target.value)}
                      />
                      <InputGroup.Text>Dinars</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
                <Form.Label>Comments:</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={comment}
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>
              </fieldset>
            </Col>
            <Col xs={1}></Col>
            <Col>
              <fieldset>
                <legend>Technical Informations</legend>
                <Row className="mb-3">
                  <Col>
                    <Form.Select
                      value={mark}
                      onChange={(e) => setMark(e.target.value)}
                    >
                      <option value="">Mark</option>
                      <option value="ProfinePlus">ProfinePlus</option>
                      <option value="Aqualine">Aqualine</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                    {error.mark ? (
                      <p className="text-danger">{error.mark.message}</p>
                    ) : null}
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Company Installation?"
                      checked={installed}
                      onChange={(e) => setInstalled(e.target.checked)}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="With Pump?"
                      checked={withPump}
                      onChange={(e) => setWithPump(e.target.checked)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Form.Label>Consumables and Spare Parts:</Form.Label>

                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Electro-Vanne"
                      type="checkbox"
                      checked={van}
                      onChange={(e) => setVan(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Pump"
                      type="checkbox"
                      checked={pump}
                      onChange={(e) => setPump(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="AC/DC Charger"
                      type="checkbox"
                      checked={charger}
                      onChange={(e) => setCharger(e.target.checked)}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Pressostat BP"
                      type="checkbox"
                      checked={bp}
                      onChange={(e) => setBp(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Pressostat HP"
                      type="checkbox"
                      checked={hp}
                      onChange={(e) => setHp(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Shut-Off"
                      type="checkbox"
                      checked={shut}
                      onChange={(e) => setShut(e.target.checked)}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Supply Valve"
                      type="checkbox"
                      checked={valve}
                      onChange={(e) => setValve(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Tank"
                      type="checkbox"
                      checked={tank}
                      onChange={(e) => setTank(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Faucet"
                      type="checkbox"
                      checked={faucet}
                      onChange={(e) => setFaucet(e.target.checked)}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Filters"
                      type="checkbox"
                      checked={filter}
                      onChange={(e) => setFilter(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="T33"
                      type="checkbox"
                      checked={t33}
                      onChange={(e) => setT33(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      label="Membrane"
                      type="checkbox"
                      checked={membrane}
                      onChange={(e) => setMembrane(e.target.checked)}
                    />
                  </div>
                </Row>
                <Form.Label>TDS (PPM):</Form.Label>
                <Form.Range
                  min="10"
                  max="900"
                  value={tds}
                  onChange={(e) => setTds(e.target.value)}
                  style={{
                    background: `linear-gradient(90deg, blue ${
                      ((tds - 10) / (900 - 10)) * 100
                    }%, gray ${((tds - 10) / (900 - 10)) * 100}%)`,
                  }}
                />
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="min-value fw-medium">10</span>
                  <span className="max-value fw-medium">900</span>
                </div>
                {/* Display the current value of the range input */}
                <p>
                  The current value is:{" "}
                  <span className="fw-bold">{tds} PPM</span>.
                </p>
              </fieldset>
            </Col>
          </Row>
          <Row className="mt-3 mx-auto w-25">
            <Button variant="primary" type="submit" className="mb-3">
              Edit Sheet
            </Button>
          </Row>
        </Container>
      </form>
    </div>
  );
};
export default Update