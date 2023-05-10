import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 250;
const navItems = [
  { name: "Home", path: "/#home" },
  { name: "Nosotros", path: "/#nosotros" },
  { name: "Menú", path: "/#menu" },
  { name: "Contacto", path: "/#contacto" },
];

const buttonStyle = {
  "&:hover": {
    color: "#FE6A2C",
    background: "var(--color-black)",
  },
  "&:focus": {
    boxShadow: " 0px 1px 0px 0px #FE6A2C",
  },
  color: "#fff",
  fontFamily: "var(--font-subtitle)",
  fontSize: "22px",
  marginRight: "7rem",
};

const buttonStyleResponsive = {
  "&:hover": {
    color: "#FE6A2C",
    background: "var(--color-black)",
  },
  "&:focus": {
    boxShadow: " 0px 1px 0px 0px #FE6A2C",
  },
  "& .MuiTypography-root": {
    fontSize: "1.2rem",
    fontFamily: "var(--font-subtitle)",
  },
  color: "#fff",
};

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", background: "#1f1f1f", padding: "1.5rem" }}
    >
      <Typography
        sx={{
          my: 2,
          fontFamily: "var(--font-subtitle)",
          fontWeight: "500",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        ESTACIÓN Express
      </Typography>

      <Divider sx={{ background: "#FE6A2C" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton href={item.path} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} sx={buttonStyleResponsive} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: "0 0 0" }}>
        <Toolbar sx={{ background: "#1f1f1f", padding: { sm: "1rem" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              ml: "7rem",
              display: { xs: "none", sm: "block" },
              fontFamily: "var(--font-subtitle)",
              fontSize: "30px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            ESTACIÓN Express
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={buttonStyle} href={navItems[0].path}>
              Home
            </Button>
            <Button sx={buttonStyle} href={navItems[1].path}>
              Nosotros
            </Button>
            <Button sx={buttonStyle} href={navItems[2].path}>
              Menú
            </Button>
            <Button sx={buttonStyle} href={navItems[3].path}>
              Contacto
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              background: "var(--color-black)",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
