import React, { memo, useState, useContext } from "react";
import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import Container from "@material-ui/core/Container";

import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems, SecondaryListItems } from "./listItems";
import Roles from "./Roles";
import Products from "./Products";
import { AuthContext } from "../context/auth";
import Admins from "./Admins";
import Nothing from "../errors/Nothing";
import { registerLocale } from "react-datepicker";
import gql from "graphql-tag";
import {  useQuery } from "@apollo/client";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
      CONTROL DE INVENTARIO Y NÓMINA DE LA PANADERÍA Y PASTELERÍA VENEZUELA III
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.secondary.main,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "white"
  },
  menuButtonHidden: {
    display: "none",
    color: "white"
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
});

function SelectComponent(props) {
  const { screen, otherProps } = props;

  switch (screen) {
    case "Administradores":
      return <Admins roles={otherProps.data} />;
    case "Roles":
      return <Roles {...otherProps} />;
    case "Products":
      return <Products />
    default:
      <Nothing
        min={true}
        text={`Error! se ha cometido alguna violación al sistema`}
      />;
  }
}
const GET_ROLES = gql`
  {
    getRoles {
      id
      name
      permisos
      value
    }
  }
`;
function Dashboard(props) {
  const { classes } = props;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState("Products");
  registerLocale("es", es); // register it with the name you want
  const { data, loading, error, refetch } = useQuery(GET_ROLES);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            noWrap
            className={classes.title}
          >
            CONTROL DE INVENTARIO Y NÓMINA DE LA PANADERÍA Y PASTELERÍA VENEZUELA III
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems user={user} setScreen={setScreen} />
        </List>
        <Divider />
        <List>
          <SecondaryListItems user={user} setScreen={setScreen} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <SelectComponent otherProps={{data, loading, error, refetch}} screen={screen} />
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(memo(Dashboard));
