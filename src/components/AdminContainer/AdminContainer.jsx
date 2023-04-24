import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import InstagramIcon from "@mui/icons-material/Instagram";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminContainer({ children }) {
  
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconosCss = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  const itemButton = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Panel de control
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem
            key="Promociones"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/admin/promotions");
            }}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <FastfoodOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Promociones"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="Productos"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/admin/products");
            }}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <LocalCafeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Productos"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem
            key="Administradores"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/admin/administrators");
            }}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <SupervisorAccountOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Administradores"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="establecimiento"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/admin/establishment");
            }}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText
                primary="Mi negocio"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Redes Sociales"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/admin/social_networks");
            }}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <InstagramIcon />
              </ListItemIcon>
              <ListItemText
                primary="Redes Sociales"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            key="Cerrar sesión"
            disablePadding
            sx={{ display: "block" }}
            onClick={() => logOut()}
          >
            <ListItemButton sx={itemButton}>
              <ListItemIcon sx={iconosCss}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar sesión"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
