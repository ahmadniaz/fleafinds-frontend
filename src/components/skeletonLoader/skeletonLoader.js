import React from "react";
import { Box, Skeleton, Grid2 } from "@mui/material";

const SkeletonLoader = ({ type = "card", count = 6 }) => {
  return (
    <Grid2 container spacing={3}>
      {[...Array(count)].map((_, index) => (
        <Grid2 item xs={12} sm={6} md={6} lg={3} key={index}>
          {type === "card" && (
            <Box sx={{ width: 300, height: 200, padding: 2 }}>
              <Skeleton variant="rectangular" width={300} height={150} />
              <Skeleton variant="text" width={200} height={20} sx={{ mt: 1 }} />
              <Skeleton variant="text" width={150} height={20} />
            </Box>
          )}
          {type === "list" && (
            <Box sx={{ width: "100%", padding: 2 }}>
              <Skeleton variant="text" width={300} height={20} />
              <Skeleton variant="text" width={250} height={20} />
            </Box>
          )}
          {type === "profile" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Skeleton variant="circular" width={50} height={50} />
              <Box>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>
            </Box>
          )}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default SkeletonLoader;
