import { useState } from "react";
import { Box, Typography } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebar() {
  const [stockOpen, setStockOpen] = useState(true);

  return (
    <Box
      sx={{
        width: 260,
        background: "#082c63",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Typography fontSize={32}>📦</Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mt: 1,
          }}
        >
          Stock Management
        </Typography>
      </Box>

      {/* Menu */}
      <Box sx={{ p: 2 }}>
        {/* Dashboard */}
        <Box
          sx={menuStyle}
        >
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </Box>

        {/* Master Data */}
        <Box
          sx={menuStyle}
        >
          <Inventory2Icon />
          <Typography>Master Data</Typography>
        </Box>

        {/* Purchase */}
        <Box
          sx={menuStyle}
        >
          <ShoppingCartIcon />
          <Typography>Purchase</Typography>
        </Box>

        {/* Stock */}
        <Box
          sx={{
            background: "#0d47a1",
            borderRadius: 2,
            mb: 1,
            overflow: "hidden",
          }}
        >
          <Box
            onClick={() =>
              setStockOpen(!stockOpen)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              p: 1.5,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <WarehouseIcon />

              <Typography
                fontWeight={600}
              >
                Stock
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                transition: "0.3s",
                transform: stockOpen
                  ? "rotate(0deg)"
                  : "rotate(-90deg)",
              }}
            />
          </Box>

          {stockOpen && (
            <Box
              sx={{
                pl: 6,
                pb: 1,
              }}
            >
              <Box
                sx={{
                  py: 1,
                  color: "#90caf9",
                  fontWeight: 700,
                }}
              >
                Material Entry
              </Box>

              <Box sx={{ py: 1 }}>
                Material Issue
              </Box>

              <Box sx={{ py: 1 }}>
                Stock Transfer
              </Box>

              <Box sx={{ py: 1 }}>
                Stock Adjustment
              </Box>

              <Box sx={{ py: 1 }}>
                Stock Ledger
              </Box>
            </Box>
          )}
        </Box>

        {/* Reports */}
        <Box
          sx={menuStyle}
        >
          <AssessmentIcon />
          <Typography>Reports</Typography>
        </Box>

        {/* Alerts */}
        <Box
          sx={menuStyle}
        >
          <NotificationsIcon />
          <Typography>Alerts</Typography>
        </Box>

        {/* Settings */}
        <Box
          sx={menuStyle}
        >
          <SettingsIcon />
          <Typography>Settings</Typography>
        </Box>
      </Box>
    </Box>
  );
}

const menuStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 1.5,
  borderRadius: 2,
  mb: 1,
  cursor: "pointer",

  "&:hover": {
    background: "#0d47a1",
  },
};
