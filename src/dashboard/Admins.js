import React, { useState, Fragment, useContext } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Loading from "../errors/Loading";
import Nothing from "../errors/Nothing";
import Paper from "@material-ui/core/Paper";
import Admin from "../Dialogs/Admin";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

import { useQuery, useMutation } from "@apollo/client";

const ADMINS_DATA = gql`
  {
    getUsers {
      id
      username
      email
      role {
        id
        value
        name
      }
      genero
      edad
    }
  }
`;
const ADMIN_DELETE = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const headCells = [
  {
    id: "username",
    align: "left",
    disablePadding: true,
    label: "Nombre de usuario",
  },
  { id: "email", align: "left", disablePadding: false, label: "Email" },
  { id: "sueldo", align: "left", disablePadding: false, label: "Rol" },
  { id: "", align: "right", disablePadding: false, label: "Sueldo" },
  { id: "borrar", align: "center", disablePadding: false, label: "Borrar" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    backgroundColor: theme.palette.secondary.main,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  formControl: {
    width: 190,
    maxWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Admins(props) {
  const { roles } = props;
  const actualUser = useContext(AuthContext);
  const classes = useStyles();

  const page = 0;
  const rowsPerPage = 5;

  const [open, setOpen] = useState({ open: false, admin: null });

  const { data, loading, refetch, error } = useQuery(ADMINS_DATA);

  const [deleteAdmin] = useMutation(ADMIN_DELETE, {
    onError: (err) => alert(err),
    onCompleted: () => refetch(),
  });
  const onCloseAdmin = () => {
    setOpen({ open: false, admin: null });
  };

  let users = [];
  if (data) {
    users = data.getUsers;
  }
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" justifyContent="center" p={3}>
          <Button
            onClick={() => setOpen({ open: true, admin: null })}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Añadir
          </Button>
        </Box>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={users.length} />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell>
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell>
                    <Nothing min={true} text={`Error! ${error.message}`} />
                  </TableCell>
                </TableRow>
              ) : users.length < 1 ? (
                <TableRow>
                  <TableCell>
                    <Nothing
                      min={true}
                      text={`Error! no se ha encontrado ningún administrador`}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <Fragment>
                  {users.map((user) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      <TableCell
                        onClick={() => setOpen({ open: true, admin: user })}
                        style={{ cursor: "pointer" }}
                      >
                        {user.username}
                      </TableCell>
                      <TableCell
                        onClick={() => setOpen({ open: true, admin: user })}
                        style={{ cursor: "pointer" }}
                        align="left"
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        onClick={() => setOpen({ open: true, admin: user })}
                        style={{ cursor: "pointer" }}
                        align="left"
                      >
                        {user.role.name}
                      </TableCell>
                      <TableCell
                        onClick={() => setOpen({ open: true, admin: user })}
                        style={{ cursor: "pointer" }}
                        align="right"
                      >
                        {user.role.value + "$"}
                      </TableCell>
                      <TableCell align="center">
                        {actualUser.user.id !== user.id && (
                          <Button
                            onClick={() =>
                              deleteAdmin({ variables: { id: user.id } })
                            }
                            variant="contained"
                            color="primary"
                            style={{ color: "white" }}
                          >
                            Borrar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {open.open && (
          <Admin
            callback={refetch}
            roles={roles}
            close={onCloseAdmin}
            admin={open.admin}
          />
        )}
      </Paper>
    </div>
  );
}
