import React, { useState } from "react";

const DropArea = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileID").click();
  };

  // Inline styles
  const styles = {
    dropBox: {
      margin: "10px 0",
      padding: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      border: "3px dotted #a3a3a3",
      borderRadius: "5px",
    },
    header: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#2e2e2e",
    },
    paragraph: {
      marginTop: "10px",
      marginBottom: "20px",
      fontSize: "12px",
      color: "#a3a3a3",
    },
    button: {
      textDecoration: "none",
      backgroundColor: "#005af0",
      color: "#ffffff",
      padding: "10px 20px",
      border: "none",
      outline: "none",
      transition: "0.3s",
      cursor: "pointer",
    },
    buttonHover: {
      textDecoration: "none",
      backgroundColor: "#ffffff",
      color: "#005af0",
      border: "1px solid #010101",
    },
    input: {
      margin: "10px 0",
      width: "100%",
      backgroundColor: "#e2e2e2",
      border: "none",
      outline: "none",
      padding: "12px 20px",
      borderRadius: "4px",
    },
  };

  return (
    <div style={styles.dropBox}>
      <header>
        <h4 style={styles.header}>
          {fileName ? `Selected File: ${fileName}` : "Select File here"}
        </h4>
      </header>
      <p style={styles.paragraph}>Files Supported: All file types</p>
      <input
        type="file"
        hidden
        id="fileID"
        onChange={handleFileChange}
        style={styles.input}
      />
      <button
        style={styles.button}
        onClick={handleButtonClick}
        onMouseOver={(e) =>
          (e.currentTarget.style = { ...styles.button, ...styles.buttonHover })
        }
        onMouseOut={(e) => (e.currentTarget.style = styles.button)}
      >
        Choose File
      </button>
    </div>
  );
};

export default DropArea;
