import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

function EmailContent() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Kindly check this latest update</Typography>
        <Box>
          <IconButton>
            <StarIcon />
          </IconButton>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body1" color="textSecondary">
        From: James Smith (hello@loremipsum.com)
      </Typography>
      <Chip label="Promotional" color="primary" />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Hello Andrew,
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum hendrerit
        lobortis. Nullam ut lacus eros. Sed at luctus urna, eu fermentum diam. In et tristique
        mauris.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Ut id ornare metus, sed auctor enim. Pellentesque nisi magna, laoreet a augue eget, tempor
        volutpat diam.
      </Typography>
    </Box>
  );
}

export default EmailContent;
