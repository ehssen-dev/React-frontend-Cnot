import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  ListGroup,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import InvoiceService from "../../../services/CommunicationInterne/InvoiceService";
import ProjectService from "../../../services/CommunicationInterne/projectService"; // Import ProjectService
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [projectName, setProjectName] = useState(""); // State for project name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await InvoiceService.getInvoiceById(invoiceId);
        setInvoice(response.data);

        // Fetch project name if projectId exists
        if (response.data.projectId) {
          const projectResponse = await ProjectService.getProjectById(
            response.data.projectId
          );
          setProjectName(projectResponse.data.projectName); // Set the project name
        }
      } catch (err) {
        setError("Failed to fetch invoice details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handleDownloadPDF = async () => {
    if (componentRef.current) {
      try {
        const canvas = await html2canvas(componentRef.current, {
          scrollX: 0,
          scrollY: -window.scrollY,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 230; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("invoice.pdf");
      } catch (err) {
        console.error("Error generating PDF:", err);
        setError("Failed to generate PDF.");
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!invoice) return <p>No invoice found.</p>;

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={12}>
          <Card ref={componentRef} className="shadow-lg">
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h3 className="mb-0">Invoice Details</h3>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Invoice ID & Number</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Invoice ID:</strong> {invoice.invoiceId}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Invoice Number:</strong>{" "}
                          {invoice.invoiceNumber}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Invoice Date</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Invoice Date:</strong>{" "}
                          {new Date(invoice.invoiceDate).toLocaleDateString()}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Description & Paid Status</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Description:</strong>{" "}
                          {invoice.description || "No description provided"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Paid:</strong> {invoice.paid ? "Yes" : "No"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Budget & Project Name</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Budget ID:</strong>{" "}
                          {invoice.budgetId || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Project Name:</strong> {projectName || "N/A"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={8}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Purchase Orders</h5>
                    </Card.Header>
                    <Card.Body>
                      {invoice.purchaseOrders &&
                      invoice.purchaseOrders.length > 0 ? (
                        <ListGroup>
                          {invoice.purchaseOrders.map((po) => (
                            <ListGroup.Item key={po.purchaseId}>
                              <div>
                                <strong>Order Number:</strong> {po.orderNumber}
                              </div>
                              <div>
                                <strong>Order:</strong> {po.purchaseName}
                              </div>
                              <div>
                                <strong>Quantity:</strong> {po.quantity}
                              </div>
                              <div>
                                <strong>Total Amount:</strong>{" "}
                                {po.totalAmount.toFixed(2)} DT
                              </div>
                              <div>
                                <strong>Purchase Date:</strong>{" "}
                                {new Date(po.purchaseDate).toLocaleDateString()}
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p>No purchase orders found.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="text-right font-weight-bold">
                          <strong>Total Amount:</strong>{" "}
                          {invoice.totalAmount.toFixed(2)} DT
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={12} className="text-center">
                  <Button
                    style={{
                      backgroundColor: "#000520",
                      borderColor: "##59595a",
                    }}
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceDetails;
