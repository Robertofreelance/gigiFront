import React, { useContext, Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RedeemIcon from "@material-ui/icons/Redeem";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CategoryIcon from "@material-ui/icons/Category";
import { AuthContext } from "../context/auth";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AddAlertIcon from "@material-ui/icons/AddAlert";

export function MainListItems(props) {
  const { setScreen } = props;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <ListItem onClick={() => setScreen("Products")} button>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>
      {user && user.role.permisos.includes("admin") && (
        <Fragment>
          <ListItem onClick={() => setScreen("Administradores")} button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Administradores" />
          </ListItem>

          <ListItem onClick={() => setScreen("Roles")} button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItem>
        </Fragment>
      )}
    </div>
  );
}

export function SecondaryListItems(props) {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <ListItem onClick={() => logout()} button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItem>
    </div>
  );
}
