import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path;

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
                    borderBottom:
                      "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "12px",
                      background: "#0d47a1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WarehouseIcon
                      sx={{
                        color: "white",
                        fontSize: 28,
                      }}
                    />
                  </Box>

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
        <Box sx={menuStyle}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </Box>

        <Box sx={menuStyle}>
          <Inventory2Icon />
          <Typography>Master Data</Typography>
        </Box>

        <Box sx={menuStyle}>
          <ShoppingCartIcon />
          <Typography>Purchase</Typography>
        </Box>

        {/* STOCK */}
        <Box sx={{ mb: 1 }}>
          <Box
            onClick={() => setOpen(!open)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              p: 1.5,
              borderRadius: 2,
              cursor: "pointer",

              "&:hover": {
                background: "#0d47a1",
              },
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

              <Typography fontWeight={600}>
                Stock
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                transition: "0.3s",
                transform: open
                  ? "rotate(0deg)"
                  : "rotate(-90deg)",
              }}
            />
          </Box>

          {open && (
            <Box
              sx={{
                pl: 5,
                mt: 1,
              }}
            >
              {[
                {
                  name: "Unit Entry",
                  path: "/unit-entry",
                },
                {
                  name: "Stock In",
                  path: "/stock-in",
                },
                {
                  name: "Stock Out",
                  path: "/stock-out",
                },
                {
                  name: "Stock Transfer",
                  path: "/stock-transfer",
                },
                {
                  name: "Stock Ledger",
                  path: "/stock-ledger",
                },
              ].map((item) => (
                <Box
                  key={item.path}
                  onClick={() =>
                    navigate(item.path)
                  }
                  sx={{
                    py: 1,
                    px: 1.5,
                    mb: 0.5,
                    cursor: "pointer",
                    borderRadius: 1,

                    color: isActive(item.path)
                      ? "#90caf9"
                      : "white",

                    fontWeight: isActive(
                      item.path
                    )
                      ? 700
                      : 400,

                    background: isActive(
                      item.path
                    )
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",

                    "&:hover": {
                      background:
                        "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {item.name}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={menuStyle}>
          <AssessmentIcon />
          <Typography>Reports</Typography>
        </Box>

        <Box sx={menuStyle}>
          <SettingsIcon />
          <Typography>Settings</Typography>
        </Box>
      </Box>
    </Box>
  );
}