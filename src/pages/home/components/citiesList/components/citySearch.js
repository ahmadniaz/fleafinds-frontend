import React from "react";
import { TextField, Box } from "@mui/material";
import { useLanguage } from "../../../../../context/LanguageContext";

const SearchBar = ({ handleSearch, citySearch }) => {
  const { translations } = useLanguage();
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
        placeholder={`${translations.CITIES_LIST.TEXTFIELD}`}
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
