import {
  AppBar, Toolbar,Typography,Box,IconButton,Badge,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        background: "white",
        color: "black",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left side */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Unit Entry
          </Typography>

          <Typography variant="body2" color="gray">
            Master Data / Unit Entry
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <IconButton>
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon />
            <Typography fontWeight={600}>
              Admin User
            </Typography>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
}