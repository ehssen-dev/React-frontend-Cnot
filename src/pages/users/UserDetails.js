import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { getUserById, deleteUser } from "../../services/UserService";
import { message } from "antd";
import {
  Email as EmailIcon,
  AccountCircle as AccountCircleIcon,
  Lock as LockIcon,
  Message as MessageIcon,
  RequestQuote as RequestQuoteIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

// Role name mapping
const roleNameMapper = {
  ROLE_USER: "USER",
  ROLE_ADMIN: "ADMIN",
  ROLE_MODERATOR: "MODERATOR",
  ROLE_ATHLETE: "ATHLETE",
  ROLE_DELEGATION: "DELEGATION",
};

const UserDetails = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      message.success("User deleted successfully!");
      navigate("/admin/user-list"); // Redirect to user list after deletion
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <p>No user found.</p>;

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={12}>
          <Card className="shadow-lg">
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h3 className="mb-0">User Details</h3>
            </Card.Header>

            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Basic Information</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <AccountCircleIcon className="me-2" />
                          <strong>Identifier:</strong>{" "}
                          {user.identifier || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <AccountCircleIcon className="me-2" />
                          <strong>User ID:</strong> {user.userId}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <AccountCircleIcon className="me-2" />
                          <strong>Username:</strong> {user.username}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <EmailIcon className="me-2" />
                          <strong>Email:</strong> {user.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <LockIcon className="me-2" />
                          <strong>Active:</strong> {user.active ? "Yes" : "No"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Roles & Permissions</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <LockIcon className="me-2" />
                          <strong>Roles:</strong>{" "}
                          {user.roles
                            .map(
                              (role) => roleNameMapper[role.name] || role.name
                            )
                            .join(", ")}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Messages & Documents</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <MessageIcon className="me-2" />
                          <strong>Sent Messages:</strong>{" "}
                          {user.sentMessages.length > 0
                            ? user.sentMessages.join(", ")
                            : "No messages sent"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <MessageIcon className="me-2" />
                          <strong>Received Messages:</strong>{" "}
                          {user.receivedMessages.length > 0
                            ? user.receivedMessages.join(", ")
                            : "No messages received"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <MailIcon className="me-2" />
                          <strong>Uploaded Documents:</strong>{" "}
                          {user.uploadedDocuments.length > 0
                            ? user.uploadedDocuments.join(", ")
                            : "No documents uploaded"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <MailIcon className="me-2" />
                          <strong>Accessible Documents:</strong>{" "}
                          {user.accessibleDocuments.length > 0
                            ? user.accessibleDocuments.join(", ")
                            : "No accessible documents"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Procurement Requests</h5>
                    </Card.Header>
                    <Card.Body>
                      {user.procurementRequests.length > 0 ? (
                        <ListGroup>
                          {user.procurementRequests.map((request, index) => (
                            <ListGroup.Item key={index}>
                              <RequestQuoteIcon className="me-2" />
                              {request}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p>No procurement requests</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card style={{ borderColor: "#000520" }}>
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Mails</h5>
                    </Card.Header>
                    <Card.Body>
                      {user.mails.length > 0 ? (
                        <ListGroup>
                          {user.mails.map((mail, index) => (
                            <ListGroup.Item key={index}>
                              <MailIcon className="me-2" />
                              {mail}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p>No mails</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={12} className="text-center"></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
