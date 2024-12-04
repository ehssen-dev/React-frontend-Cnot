import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Visibility, FileDownload, Delete } from "@mui/icons-material";
import {
  getAllDocuments,
  deleteDocument,
} from "../../services/CommunicationInterne/documentsService";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/common/Navbars/DashboardNavbar";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      await deleteDocument(documentId);
      setDocuments(documents.filter((doc) => doc.documentId !== documentId));
    } catch (error) {
      console.error(`Error deleting document with ID ${documentId}:`, error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Document List
        </Typography>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={3}>
            {documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.documentId}>
                <Paper
                  elevation={2}
                  style={{ padding: "10px", display: "flex", alignItems: "center" }}
                >
                  <ListItem>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Type: ${doc.contentType} | Size: ${doc.fileSize} bytes`}
                    />
                    <IconButton component={Link} to={`/documents/${doc.documentId}`} title="View">
                      <Visibility />
                    </IconButton>
                    <IconButton
                      href={`http://localhost:8080/api/documents/${doc.documentId}/download`}
                      title="Download"
                    >
                      <FileDownload />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doc.documentId)} title="Delete">
                      <Delete />
                    </IconButton>
                  </ListItem>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default DocumentList;
