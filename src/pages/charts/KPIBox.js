// KPIBox.js
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const KPIBox = ({ title, value }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ marginTop: 1 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default KPIBox;
