import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

export default function StockInPage() {
  const materials = [
    {
      code: "MAT001",
      name: "A4 Paper Ream",
      uom: "Ream",
      batch: "B24052401",
      mfg: "01/05/2024",
      exp: "-",
      qty: 10,
      price: 250,
      amount: "2,500.00",
    },
    {
      code: "MAT002",
      name: "Blue Ball Pen",
      uom: "Nos",
      batch: "B24052402",
      mfg: "10/05/2024",
      exp: "-",
      qty: 50,
      price: 10,
      amount: "500.00",
    },
    {
      code: "MAT003",
      name: "Printer Cartridge HP 12A",
      uom: "Nos",
      batch: "B24052403",
      mfg: "15/04/2024",
      exp: "15/04/2026",
      qty: 5,
      price: 1250,
      amount: "6,250.00",
    },
    {
      code: "MAT004",
      name: "Stapler",
      uom: "Nos",
      batch: "B24052404",
      mfg: "-",
      exp: "-",
      qty: 10,
      price: 120,
      amount: "1,200.00",
    },
    {
      code: "MAT005",
      name: "File Folder",
      uom: "Nos",
      batch: "B24052405",
      mfg: "-",
      exp: "-",
      qty: 30,
      price: 25,
      amount: "750.00",
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#111827",
            mb: 0.5,
          }}
        >
          Material Entry
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Stock &gt; Material Entry
        </Typography>
      </Box>

      {/* Entry Details */}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            mb: 4,
          }}
        >
          Entry Details
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              required
              label="Entry Type"
              defaultValue="Purchase"
              size="small"
            >
              <MenuItem value="Purchase">Purchase</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
              <MenuItem value="Transfer">Transfer</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              required
              type="date"
              label="Entry Date"
              size="small"
              defaultValue="2024-05-24"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              required
              type="date"
              label="Posting Date"
              size="small"
              defaultValue="2024-05-24"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              required
              label="Warehouse"
              defaultValue="Main Warehouse"
              size="small"
            >
              <MenuItem value="Main Warehouse">
                Main Warehouse
              </MenuItem>

              <MenuItem value="Secondary Warehouse">
                Secondary Warehouse
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              select
              fullWidth
              required
              label="Supplier"
              defaultValue=""
              size="small"
            >
              <MenuItem value="ABC Traders">ABC Traders</MenuItem>
              <MenuItem value="XYZ Suppliers">XYZ Suppliers</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              required
              label="Challan / Invoice No."
              size="small"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField fullWidth label="Vehicle No." size="small" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField fullWidth label="GRN No." size="small" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField fullWidth label="Reference No." size="small" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField fullWidth label="Notes" size="small" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }} />
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} />
        </Grid>
      </Paper>

      {/* Material Details */}

 <Paper
  elevation={0}
  sx={{
    mt: 3,
    p: 4,
    borderRadius: 3,
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
  }}
>
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    flexWrap: "wrap",
    gap: 2,
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      color: "#0f172a",
    }}
  >
    Material Details
  </Typography>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      flexWrap: "wrap",
    }}
  >
    <TextField
      size="small"
      placeholder="Search material (name / code / barcode)"
      sx={{
        width: {
          xs: "100%",
          sm: 360,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: "#94a3b8",
                fontSize: 20,
              }}
            />
          </InputAdornment>
        ),
      }}
    />

    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        height: 40,
        whiteSpace: "nowrap",
      }}
    >
      Add Row
    </Button>
  </Box>
</Box>

  <TableContainer
    sx={{
      border: "1px solid #e5e7eb",
      borderRadius: 2,
    }}
  >
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f8fafc" }}>
          <TableCell>#</TableCell>
          <TableCell>Material Code *</TableCell>
          <TableCell>Material Name</TableCell>
          <TableCell>UOM *</TableCell>
          <TableCell>Batch No.</TableCell>
          <TableCell>Mfg. Date</TableCell>
          <TableCell>Exp. Date</TableCell>
          <TableCell>Quantity *</TableCell>
          <TableCell>Unit Price (₹)</TableCell>
          <TableCell>Amount (₹)</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell
            colSpan={11}
            align="center"
            sx={{
              py: 6,
              color: "#94a3b8",
            }}
          >
            No materials added
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>

  <Box
    sx={{
      mt: 3,
      px: 2,
      py: 2,
      borderRadius: 2,
      backgroundColor: "#f8fafc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
    }}
  >
    <Typography fontWeight={600}>
      Total Items: 0
    </Typography>

    <Box display="flex" gap={5}>
      <Typography fontWeight={600}>
        Total Quantity: 0
      </Typography>

      <Typography fontWeight={700} color="#2563eb">
        Total Amount (₹): 0.00
      </Typography>
    </Box>
  </Box>

  <Box
    display="flex"
    justifyContent="flex-end"
    gap={2}
    mt={3}
  >
    <Button
      variant="outlined"
      sx={{ textTransform: "none" }}
    >
      Reset
    </Button>

    <Button
      variant="outlined"
      sx={{ textTransform: "none" }}
    >
      Save as Draft
    </Button>

    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        backgroundColor: "#2563eb",
      }}
    >
      Submit
    </Button>
  </Box>
</Paper>
    </Box>
  );
}
