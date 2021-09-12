import React, { useContext, Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShopIcon from "@material-ui/icons/Shop";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { AuthContext } from "../context/auth";
export function MainListItems(props) {
  const { setScreen } = props;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <ListItem onClick={() => setScreen("Products")} button>
        <ListItemIcon>
          <ShopIcon />
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
              <SupervisorAccountIcon />
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
