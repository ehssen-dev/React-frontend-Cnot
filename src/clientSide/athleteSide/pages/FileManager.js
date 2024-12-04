import React, { useState, useEffect } from "react";
import {
  uploadFile,
  downloadFile,
  listFiles,
} from "../../../services/fileService"; // Adjust the path if necessary
import DropArea from "./DropArea";
// Import icons
import pdfIcon from "../../../assets/img/pdf-icon.jpeg";
import fileIcon from "../../../assets/img/file-icon.jpeg";
import imagePlaceholder from "../../../assets/img/placeholder-icon..webp"; // Optional placeholder

const FileManager = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFilesAndDirectories();
  }, []);

  const fetchFilesAndDirectories = async () => {
    try {
      const response = await listFiles();
      setFiles(response.files || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      setFiles([]);
    }
  };

  const handleFileUpload = (file) => {
    uploadFile(file)
      .then((response) => {
        console.log(response);
        fetchFilesAndDirectories();
      })
      .catch(console.error);
  };

  const handleDownload = (fileName) => {
    downloadFile(fileName).catch(console.error);
  };

  const getFilePreview = (file) => {
    if (
      file.name.endsWith(".png") ||
      file.name.endsWith(".jpg") ||
      file.name.endsWith(".jpeg")
    ) {
      return imagePlaceholder;
    } else if (file.name.endsWith(".pdf")) {
      return pdfIcon;
    } else {
      return fileIcon;
    }
  };

  // Inline styles
  const styles = {
    fileManager: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      color: "#333",
    },
    header1: {
      fontSize: "2em",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    header2: {
      fontSize: "1.5em",
      marginTop: "30px",
      marginBottom: "15px",
      color: "#2c3e50",
    },
    uploadSection: {
      marginBottom: "30px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    fileInput: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
    },
    uploadButton: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    uploadButtonHover: {
      backgroundColor: "#2980b9",
    },
    fileCardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    fileCard: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "250px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    fileCardHeader: {
      marginBottom: "10px",
    },
    fileCardImage: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    fileName: {
      fontSize: "1.2em",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    fileCardBody: {
      marginBottom: "15px",
    },
    fileSize: {
      fontSize: "0.9em",
      color: "#777",
    },
    fileDate: {
      fontSize: "0.9em",
      color: "#777",
    },
    fileCardFooter: {
      marginTop: "auto",
    },
    fileCardFooterButton: {
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
    fileCardFooterButtonHover: {
      backgroundColor: "#27ae60",
    },
  };

  return (
    <div style={styles.fileManager}>
      <h1 style={styles.header1}>File Management</h1>

      <DropArea
        onFileUpload={handleFileUpload}
        styles={{
          uploadSection: styles.uploadSection,
          fileInput: styles.fileInput,
          uploadButton: styles.uploadButton,
          uploadButtonHover: styles.uploadButtonHover,
        }}
      />

      <h2 style={styles.header2}>Files</h2>
      <div style={styles.fileCardContainer}>
        {files.map((file) => (
          <div style={styles.fileCard} key={file.name}>
            <div style={styles.fileCardHeader}>
              <img
                src={getFilePreview(file)}
                alt={file.name}
                style={styles.fileCardImage}
              />
              <h3 style={styles.fileName}>{file.name}</h3>
            </div>
            <div style={styles.fileCardBody}>
              <p style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</p>
              <p style={styles.fileDate}>
                {new Date(file.lastModified).toLocaleDateString()}
              </p>
            </div>
            <div style={styles.fileCardFooter}>
              <button
                style={styles.fileCardFooterButton}
                onMouseOver={(e) =>
                  (e.currentTarget.style = {
                    ...styles.fileCardFooterButton,
                    ...styles.fileCardFooterButtonHover,
                  })
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style = styles.fileCardFooterButton)
                }
                onClick={() => handleDownload(file.name)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
