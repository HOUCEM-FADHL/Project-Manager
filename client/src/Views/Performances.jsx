import React, { useState, useEffect, useRef } from "react";
import NavComponent from "../Components/NavComponent";
import Chart from "chart.js/auto";
import { Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Performances = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [installationData, setInstallationData] = useState([]);
  const idx = window.localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/clients`, { withCredentials: true })
      .then((res) => {
        const filteredClients = res.data.filter(
          (client) => client.maintDate >= start && client.maintDate <= end
        );

        const sortedMaintenanceData = filteredClients.sort(
          (a, b) => new Date(a.maintDate) - new Date(b.maintDate)
        );

        const maintenanceMap = new Map();
        sortedMaintenanceData.forEach((client) => {
          const dateKey = new Date(client.maintDate).toLocaleDateString();
          if (maintenanceMap.has(dateKey)) {
            maintenanceMap.set(
              dateKey,
              maintenanceMap.get(dateKey) + client.maintPrice
            );
          } else {
            maintenanceMap.set(dateKey, client.maintPrice);
          }
        });

        const maintenanceLabels = Array.from(maintenanceMap.keys());
        const maintenancePrices = Array.from(maintenanceMap.values());

        setMaintenanceData(
          maintenanceLabels.map((date, index) => ({
            maintDate: date,
            maintPrice: maintenancePrices[index],
          }))
        );

        // Repeat the same logic for instDate and instPrice
        const sortedInstallationData = filteredClients.sort(
          (a, b) => new Date(a.instDate) - new Date(b.instDate)
        );

        const installationMap = new Map();
        sortedInstallationData.forEach((client) => {
          const dateKey = new Date(client.instDate).toLocaleDateString();
          if (installationMap.has(dateKey)) {
            installationMap.set(
              dateKey,
              installationMap.get(dateKey) + client.instPrice
            );
          } else {
            installationMap.set(dateKey, client.instPrice);
          }
        });

        const installationLabels = Array.from(installationMap.keys());
        const installationPrices = Array.from(installationMap.values());

        setInstallationData(
          installationLabels.map((date, index) => ({
            instDate: date,
            instPrice: installationPrices[index],
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [start, end]);

  const maintenanceChartRef = useRef(null);
  const maintenanceChartInstance = useRef(null);

  const installationChartRef = useRef(null);
  const installationChartInstance = useRef(null);

  useEffect(() => {
    // Maintenance Chart
    if (maintenanceChartInstance.current) {
      maintenanceChartInstance.current?.destroy();
    }

    const maintenanceCtx = maintenanceChartRef.current?.getContext("2d");
    maintenanceChartInstance.current = new Chart(maintenanceCtx, {
      type: "line",
      data: {
        labels: maintenanceData.map((data) => data.maintDate),
        datasets: [
          {
            label: "Maintenance Revenue",
            data: maintenanceData.map((data) => data.maintPrice),
            fill: false,
            backgroundColor: "#4bc0c0",
            borderColor: "#000000",
            borderWidth: 2,
          },
        ],
      },
    });

    // Installation Chart
    if (installationChartInstance.current) {
      installationChartInstance.current?.destroy();
    }

    const installationCtx = installationChartRef.current?.getContext("2d");
    installationChartInstance.current = new Chart(installationCtx, {
      type: "line",
      data: {
        labels: installationData.map((data) => data.instDate),
        datasets: [
          {
            label: "Installation Revenue",
            data: installationData.map((data) => data.instPrice),
            fill: false,
            backgroundColor: "#4bc0c0",
            borderColor: "#000000",
            borderWidth: 2,
          },
        ],
      },
    });

    return () => {
      // Cleanup for Maintenance Chart
      if (maintenanceChartInstance.current) {
        maintenanceChartInstance.current.destroy();
      }

      // Cleanup for Installation Chart
      if (installationChartInstance.current) {
        installationChartInstance.current.destroy();
      }
    };
  }, [maintenanceData, installationData]);

  return (
    <div>
      {idx ? (
        <div>
          <NavComponent home={false} />
          <div className="container mx-auto w-auto">
            <h1 className="text-center mb-5">Performances</h1>
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
            <div className="d-flex justify-content-center gap-3">
              <div style={{ width: "600px", height: "400px" }} className="mb-3">
                <canvas
                  ref={maintenanceChartRef}
                  style={{ width: "300px", height: "200px" }}
                />
              </div>
              <div style={{ width: "600px", height: "400px" }} className="mb-3">
                <canvas
                  ref={installationChartRef}
                  style={{ width: "300px", height: "200px" }}
                />
              </div>
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

export default Performances;

// import React, { useState, useEffect, useRef } from "react";
// import NavComponent from "../Components/NavComponent";
// import Chart from "chart.js/auto";
// import { Container, Form, Row, Col } from "react-bootstrap";
// import axios from "axios";

// const Performances = () => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/clients`, { withCredentials: true })
//       .then((res) => {
//         const filteredClients = res.data.filter(
//           (client) =>
//             client.maintDate >= start && client.maintDate <= end
//         );

//         const sortedClients = filteredClients.sort(
//           (a, b) => new Date(a.maintDate) - new Date(b.maintDate)
//         );

//         const clientsMap = new Map();
//         sortedClients.forEach((client) => {
//           const dateKey = new Date(client.maintDate).toLocaleDateString();
//           if (clientsMap.has(dateKey)) {
//             clientsMap.set(dateKey, clientsMap.get(dateKey) + client.maintPrice);
//           } else {
//             clientsMap.set(dateKey, client.maintPrice);
//           }
//         });

//         const labels = Array.from(clientsMap.keys());
//         const data = Array.from(clientsMap.values());

//         setClients(
//           labels.map((date, index) => ({
//             maintDate: date,
//             maintPrice: data[index],
//           }))
//         );
//       })
//       .catch((err) => console.log(err));
//   }, [start, end]);

//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const myChartRef = chartRef.current.getContext("2d");
//     chartInstance.current = new Chart(myChartRef, {
//       type: "line",
//       data: {
//         labels: clients.map((client) => client.maintDate),
//         datasets: [
//           {
//             label: "Revenue",
//             data: clients.map((client) => client.maintPrice),
//             fill: false,
//             backgroundColor: "#4bc0c0",
//             borderColor: "#000000",
//             borderWidth: 2,
//           },
//         ],
//       },
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [clients]);

//   return (
//     <div>
//       <NavComponent home={false} />
//       <div className="container mx-auto w-auto">
//         <h1 className="text-center mb-5">Performances</h1>
//         <Container className="mb-5">
//           <Row>
//             <Col>
//               <Form.Label>Select Period:</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control
//                 type="date"
//                 value={start}
//                 onChange={(e) => setStart(e.target.value)}
//               />
//             </Col>
//             <Col>
//               <Form.Control
//                 type="date"
//                 value={end}
//                 onChange={(e) => setEnd(e.target.value)}
//               />
//             </Col>
//           </Row>
//         </Container>
//         <div style={{ width: "600px", height: "400px" }}>
//           <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Performances;

//--------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import NavComponent from "../Components/NavComponent";
// import Chart from "chart.js/auto";
// import { Container, Form, Row, Col } from "react-bootstrap";
// import axios from "axios";

// const Performances = () => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/clients`, { withCredentials: true })
//       .then((res) => {
//         const filteredClients = res.data.filter(
//           (client) =>
//             client.maintDate >= start && client.maintDate <= end
//         );

//         const sortedClients = filteredClients.sort(
//           (a, b) => new Date(a.maintDate) - new Date(b.maintDate)
//         );

//         const clientsMap = new Map();
//         sortedClients.forEach((client) => {
//           const dateKey = new Date(client.maintDate).toLocaleDateString();
//           if (clientsMap.has(dateKey)) {
//             clientsMap.set(dateKey, clientsMap.get(dateKey) + client.maintPrice);
//           } else {
//             clientsMap.set(dateKey, client.maintPrice);
//           }
//         });

//         const labels = Array.from(clientsMap.keys());
//         const data = Array.from(clientsMap.values());

//         setClients(
//           labels.map((date, index) => ({
//             maintDate: date,
//             maintPrice: data[index],
//           }))
//         );
//       })
//       .catch((err) => console.log(err));
//   }, [start, end]);

//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const myChartRef = chartRef.current.getContext("2d");
//     chartInstance.current = new Chart(myChartRef, {
//       type: "line",
//       data: {
//         labels: clients.map((client) => client.maintDate),
//         datasets: [
//           {
//             label: "Revenue",
//             data: clients.map((client) => client.maintPrice),
//             fill: false,
//             backgroundColor: "#4bc0c0",
//             borderColor: "#000000",
//             borderWidth: 2,
//           },
//         ],
//       },
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [clients]);

//   return (
//     <div>
//       <NavComponent home={false} />
//       <div className="container mx-auto w-auto">
//         <h1 className="text-center mb-5">Performances</h1>
//         <Container className="mb-5">
//           <Row>
//             <Col>
//               <Form.Label>Select Period:</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control
//                 type="date"
//                 value={start}
//                 onChange={(e) => setStart(e.target.value)}
//               />
//             </Col>
//             <Col>
//               <Form.Control
//                 type="date"
//                 value={end}
//                 onChange={(e) => setEnd(e.target.value)}
//               />
//             </Col>
//           </Row>
//         </Container>
//         <div style={{ width: "600px", height: "400px" }}>
//           <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Performances;
