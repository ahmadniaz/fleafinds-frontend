import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

const theme = createTheme({
  palette, // Import palette settings
  typography, // Import typography settings
});

export default theme;
