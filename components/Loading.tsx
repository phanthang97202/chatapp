import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
