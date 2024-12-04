/*import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import SpamIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';

function SidebarMail({ onComposeClick }) {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        borderRight: '1px solid #ddd',
        height: '100vh',
      }}
    >
      <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={onComposeClick}>
        Compose
      </Button>
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Draft" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SpamIcon />
          </ListItemIcon>
          <ListItemText primary="Spam" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </Box>
  );
}

export default SidebarMail;
*/

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import SpamIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

function SidebarMail({ onComposeClick, onCategoryChange }) {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "background.paper",
        borderRight: "1px solid #ddd",
        height: "100vh",
      }}
    >
      <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={onComposeClick}>
        Compose
      </Button>
      <List>
        <ListItem button onClick={() => onCategoryChange("inbox")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button onClick={() => onCategoryChange("sent")}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
        <ListItem button onClick={() => onCategoryChange("draft")}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Draft" />
        </ListItem>
        <ListItem button onClick={() => onCategoryChange("spam")}>
          <ListItemIcon>
            <SpamIcon />
          </ListItemIcon>
          <ListItemText primary="Spam" />
        </ListItem>
        <ListItem button onClick={() => onCategoryChange("trash")}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </Box>
  );
}

SidebarMail.propTypes = {
  onComposeClick: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default SidebarMail;
