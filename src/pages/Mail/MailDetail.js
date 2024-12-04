// src/pages/Mail/MailDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MailService from "../../services/CommunicationInterne/mailService";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const MailDetails = () => {
  const { mailId } = useParams(); // Get mailId from URL parameters
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMailDetails = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // in seconds
          if (decodedToken.exp < currentTime) {
            setError("Token expired. Please log in again.");
            setLoading(false);
            return;
          }
        } catch (error) {
          setError("Invalid token. Please log in again.");
          setLoading(false);
          return;
        }
      }

      try {
        const data = await MailService.fetchMailById(mailId);
        setMail(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error fetching mail details.");
      }
    };

    fetchMailDetails();
  }, [mailId]);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography color="error" variant="h6">
            <ErrorIcon sx={{ mr: 1 }} />
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!mail) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6">No mail details found.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            <MailIcon sx={{ mr: 1 }} />
            Mail Details
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <PersonIcon sx={{ mr: 1 }} />
                  Sender:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {mail.sender}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <PersonIcon sx={{ mr: 1 }} />
                  Recipient:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {mail.recipient}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <SubjectIcon sx={{ mr: 1 }} />
                  Subject:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {mail.subject}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <MailIcon sx={{ mr: 1 }} />
                  Content:
                </Typography>
                <Typography variant="body1">{mail.content}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  Sent Date:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(mail.sentDate).toLocaleString()}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  Received Date:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {mail.receivedDate
                    ? new Date(mail.receivedDate).toLocaleString()
                    : "Not received yet"}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  Processed Date:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {mail.processedDate
                    ? new Date(mail.processedDate).toLocaleString()
                    : "Not processed yet"}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  Archived Date:
                </Typography>
                <Typography variant="body1">
                  {mail.archivedDate
                    ? new Date(mail.archivedDate).toLocaleString()
                    : "Not archived yet"}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      <LabelImportantIcon sx={{ mr: 1 }} />
                      Qualification Type:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {mail.qualificationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      Status:
                    </Typography>
                    <Typography variant="body1">{mail.status}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <AttachFileIcon sx={{ mr: 1 }} />
                  Attachments:
                </Typography>
                {mail.attachments && mail.attachments.length > 0 ? (
                  mail.attachments.map((attachment) => (
                    <Box key={attachment.id} mb={1}>
                      <a
                        href={`data:${attachment.fileType};base64,${attachment.data}`}
                        download={attachment.fileName}
                      >
                        {attachment.fileName} ({attachment.fileType})
                      </a>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1">No attachments</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/mail-list")}
            >
              Back to Mail List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MailDetails;
