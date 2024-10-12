import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ handleSearch, citySearch }) => {
  return (
    <Box
      mt={3}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px", // Adjust width as per your design
        margin: "24px auto",
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
            borderRadius: "50px", // Rounded edges for the input field
            paddingRight: 0, // Remove padding on the right side
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
