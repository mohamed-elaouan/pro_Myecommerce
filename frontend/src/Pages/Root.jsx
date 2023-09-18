import { Outlet } from "react-router-dom";
import {
  Box,
} from "@mui/material";
import Drawerr from "MUIComponent/Drawerr";
import Appbar from "MUIComponent/Appbar";
//impotent de darkmode
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { cyan, deepPurple, teal } from "@mui/material/colors";
const Root = () => {
  const drawerWidth = 240;
  //Code darkMode
  const [mode, setMode] = useState(
    localStorage.getItem("CurrentMode") == null
      ? "light"
      : localStorage.getItem("CurrentMode") === "dark"
      ? "dark"
      : "light"
  );

  const darkTheme = createTheme({
    palette: {
      // @ts-ignore
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: teal,
            divider: teal[200],
            text: {
              primary: teal[900],
              secondary: teal[800],
            },
            FavCol: {
              main: deepPurple[700],
            },
            PaperCart:{
              main:teal[500],
            },
            StylHover: {
              main: "rgba(0, 0, 0, 0.04)",
            },
            Button: {
              backgroundColor: teal,
              "&:hover": {
                backgroundColor: teal[300],
                scale: "1.05",
              },
            },
          }
        : {
            // palette values for dark mode
            FavCol: {
              main: cyan[600],
            },
            PaperCart:{
              main:teal[500],
            },
            StylHover: {
              main: "rgba(255, 255, 255, 0.08)",
            },
          }),
    },
  });

  /*debut */
  const [DrawerType, setDrawerType] = useState("permanent");
  const [DrawerDisplay, setDrawerDisplay] = useState("none");
  const ShowDrawer = () => {
    setDrawerType("temporary");
    setDrawerDisplay("block");
  };
  const HideDrawer = () => {
    setDrawerType("permanent");
    setDrawerDisplay("none");
  };
  /*Fin*/

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ backgroundImage: "red !important" }}>
        <Appbar drawerWidth={drawerWidth} ShowDrawer={ShowDrawer} />
        <Drawerr
          drawerWidth={drawerWidth}
          setMode={setMode}
          DrawerType={DrawerType}
          DrawerDisplay={DrawerDisplay}
          HideDrawer={HideDrawer}
        />
        <Box
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Root;
