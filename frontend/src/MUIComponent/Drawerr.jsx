import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Badge,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@emotion/react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {  ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 16,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Drawerr = ({
  drawerWidth,
  setMode,
  DrawerType,
  DrawerDisplay,
  HideDrawer,
}) => {
  // @ts-ignore
  const { SelectedProduct } = useSelector((state) => state.cartShop);
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const DrawerList = [
    { Nom: "Home", icon: <HomeIcon />, URL: "/" },
    {
      Nom: "Cart",
      icon: (
        <StyledBadge badgeContent={SelectedProduct.length} color="primary">
          <ShoppingCart sx={{ fontSize: 30 }} />
        </StyledBadge>
      ),
      URL: "/Cart",
    },
  ];
  return (
    <Box component={"nav"}>
      <Drawer
        sx={{
          width: drawerWidth,
          display: { xs: DrawerDisplay, md: "block" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundImage: "none",
          },
        }}
        variant={DrawerType}
        open={true}
        anchor="left"
        onClose={() => {
          HideDrawer();
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}
        >
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => {
              localStorage.setItem(
                "CurrentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              setMode(theme.palette.mode === "dark" ? "light" : "dark");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon color="warning" />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>

        <Divider color="teal" />

        <List>
          {DrawerList &&
            DrawerList.map((ele, i) => {
              return (
                <ListItem
                  key={i}
                  sx={{
                    bgcolor:
                      location.pathname === ele.URL
                        ? theme.palette.StylHover.main
                        : null,
                  }}
                  disablePadding
                  onClick={() => {
                    navigate(ele.URL);
                    setTimeout(() => {
                      HideDrawer();
                    }, 500);
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{ele.icon}</ListItemIcon>
                    <ListItemText primary={ele.Nom} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Drawer>
    </Box>
  );
};

export default Drawerr;
