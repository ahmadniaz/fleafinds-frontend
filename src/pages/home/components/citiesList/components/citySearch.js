import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ handleSearch, citySearch }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "50px",
        overflow: "hidden",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search your City"
        variant="outlined"
        value={citySearch}
        onChange={handleSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            padding: "8px 16px",
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
