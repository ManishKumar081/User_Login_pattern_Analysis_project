import { Box, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      sx={{
        background: "white",
        px: 4,
        py: 2,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
      >
        Material Entry
      </Typography>

      <Typography color="gray">
        Stock &gt; Material Entry
      </Typography>
    </Box>
  );
}
