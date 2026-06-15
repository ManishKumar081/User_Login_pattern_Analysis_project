import { Box, Paper, Typography } from "@mui/material";

export default function StockInPage() {
  return (
    <Box p={3}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5">
          Entry Details
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Stock In Page Layout 
        </Typography>
      </Paper>
    </Box>
  );
}
