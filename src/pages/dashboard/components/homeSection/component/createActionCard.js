import React from "react";
import { Card, Typography } from "@mui/material";

const CreateActionCard = ({ text, onClick }) => {
  return (
    <Card
      sx={{
        width: "300px",
        height: "224px",
        display: "flex",
        mt: 2,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={onClick}
    >
      <Typography variant="h6" fontWeight="bold">
        {text}
      </Typography>
    </Card>
  );
};

export default CreateActionCard;
