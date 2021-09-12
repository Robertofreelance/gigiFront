import React, { useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { Button, withStyles, Box } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "../errors/Loading";
import gql from "graphql-tag";
import Nothing from "../errors/Nothing";
import { useMutation } from "@apollo/client";
import Role from "../Dialogs/Role";
const headCells = [
  {
    id: "rol",
    numeric: false,
    disablePadding: false,
    label: "Nombre del rol",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Sueldo del rol",
  },
  { id: "borrar", align: "center", disablePadding: false, label: "Borrar" },
];
function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
          >
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

const ROL_DELETE = gql`
  mutation ($roleId: ID!) {
    deleteRole(roleId: $roleId) {
      id
    }
  }
`;

export default function Roles(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const { data, loading, error, refetch } = props;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edit, setEdit] = useState({ open: false, rol: null });

  let Roles = [];
  if (data) {
    Roles = data.getRoles;
  }
  const closeDialog = () => {
    setEdit({ open: false, rol: null });
  };
  const [deleteRol] = useMutation(ROL_DELETE, {
    onError: (err) => alert(err),
    onCompleted: () => refetch(),
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, Roles.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" alignItems="center" justifyContent="center" p={3}>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => setEdit({ open: true, rol: null })}
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
            <EnhancedTableHead classes={classes} rowCount={Roles.length} />
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
              ) : Roles.length < 1 ? (
                <TableRow>
                  <TableCell>
                    <Nothing
                      min={true}
                      text={`Error! no se ha encontrado ningún plan`}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <Fragment>
                  {Roles.map((rol) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rol.id}>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => setEdit({ open: true, rol: rol })}
                        align="center"
                      >
                        {rol.name}
                      </TableCell>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => setEdit({ open: true, rol: rol })}
                        align="center"
                      >
                        {rol.value + "$"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() =>
                            deleteRol({
                              variables: { roleId: rol.id },
                            })
                          }
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                        >
                          Borrar
                        </Button>
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
        {edit.open && (
          <Role callback={refetch} close={closeDialog} role={edit.rol} />
        )}
      </Paper>
    </div>
  );
}
