import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import MailService from "../../../services/CommunicationInterne/mailService";
import {
  CircularProgress,
  Typography,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  border: `2px solid ${theme.palette.primary?.main || "#0033cc"}`, // Dark blue border with fallback
  position: "relative", // Position relative for positioning the status
  overflow: "hidden",
}));

const StatusChip = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#3ba187", // Example color (green)
  color: "#fff",
  padding: "4px 8px",
  borderRadius: "16px",
  fontWeight: "bold",
  fontSize: "12px",
}));

const StyledCardHeader = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#333",
});

const StyledCardContent = styled(CardContent)({
  padding: "16px",
});

const AttachmentImage = styled("img")({
  maxWidth: "100px",
  maxHeight: "100px",
  borderRadius: "4px",
  marginRight: "8px",
});

const MailComponent = () => {
  const { athleteId } = useAuth(); // Access athleteId from the context
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attachmentUrls, setAttachmentUrls] = useState({});

  useEffect(() => {
    const fetchMails = async () => {
      if (athleteId) {
        try {
          const fetchedMails = await MailService.fetchMailsByAthleteId(
            athleteId
          );
          setMails(fetchedMails);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No athlete ID found");
        setLoading(false);
      }
    };

    fetchMails();
  }, [athleteId]);

  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      const urls = {};
      const attachmentPromises = mails.flatMap((mail) =>
        (mail.attachments || []).map(async (attachment) => {
          try {
            const blob = await MailService.fetchAttachmentDataById(
              attachment.id
            );
            urls[attachment.id] = createBlobUrl(blob);
          } catch (err) {
            console.error("Error fetching attachment data:", err);
          }
        })
      );
      await Promise.all(attachmentPromises);
      setAttachmentUrls(urls);
    };

    if (mails.length > 0) {
      fetchAttachmentUrls();
    }
  }, [mails]);

  // Function to create a URL for the Blob
  const createBlobUrl = (blob) => {
    return URL.createObjectURL(blob);
  };

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.values(attachmentUrls).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [attachmentUrls]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: "0 20px" }}>
      {" "}
      {/* Adding padding for left and right spacing */}
      <Box textAlign="center" marginBottom="20px">
        <Typography variant="h3" gutterBottom>
          My Mails
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {mails.length > 0 ? (
          mails.map((mail) => (
            <Grid item xs={12} sm={6} md={4} key={mail.mailId}>
              <StyledCard>
                <StatusChip>{mail.status}</StatusChip>
                <StyledCardContent>
                  <StyledCardHeader variant="h6">
                    {mail.subject}
                  </StyledCardHeader>
                  <Typography variant="body2" color="textSecondary">
                    <strong>From:</strong> {mail.sender}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>To:</strong> {mail.recipient}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Date:</strong>{" "}
                    {new Date(mail.sentDate).toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      {mail.content}
                    </Typography>
                  </Box>
                </StyledCardContent>
                {mail.attachments && mail.attachments.length > 0 && (
                  <CardActions>
                    {mail.attachments.map((attachment) => {
                      const blobUrl = attachmentUrls[attachment.id];
                      const mimeType =
                        attachment.mimeType || "application/octet-stream";

                      return blobUrl ? (
                        <Tooltip
                          key={attachment.id}
                          title={attachment.fileName}
                        >
                          {mimeType.startsWith("image/") ? (
                            <AttachmentImage
                              src={blobUrl}
                              alt={attachment.fileName}
                            />
                          ) : (
                            <IconButton
                              href={blobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AttachFileIcon />
                            </IconButton>
                          )}
                        </Tooltip>
                      ) : (
                        <Typography key={attachment.id}>Loading...</Typography>
                      );
                    })}
                  </CardActions>
                )}
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No mails found</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MailComponent;
