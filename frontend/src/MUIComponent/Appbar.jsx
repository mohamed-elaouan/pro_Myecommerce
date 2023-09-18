import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { IconButton, Link } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Appbar = ({ drawerWidth, ShowDrawer }) => {
  return (
    <AppBar
      // @ts-ignore
      position="sticky"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => {
            ShowDrawer();
          }}
          sx={{ mr: "7px", display: { md: "none" } }}
        >
          <Menu />
        </IconButton>
        <Link
          href="/"
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            transition: "0.4s",
            "&:hover": {
              color: "inherit",
              fontWeight: "600",
              fontSize: "17px",
            },
          }}
        >
          Online MyStore
        </Link>

        <Typography
          // @ts-ignore
          variant="p"
          color="inherit"
        >
          Mohamed El Aouan
        </Typography>

        <Avatar
          alt="Mohamed Elaouan"
          sx={{ mx: 1, my: 2 }}
          src="https://firebasestorage.googleapis.com/v0/b/pourresoudreproblem.appspot.com/o/images%2F4x4.jpg?alt=media&token=27a6c514-4039-4a65-ab04-dd51c9e4d137"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
