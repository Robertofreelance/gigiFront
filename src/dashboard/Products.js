import React, { useState, Fragment, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { Button, Box } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import Loading from "../errors/Loading";
import Product from "../Dialogs/Product";

import Nothing from "../errors/Nothing";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nombre del producto",
  },
  {
    id: "value",
    numeric: false,
    disablePadding: false,
    label: "Valor del producto",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "Cantidad en inventario",
  },
  { id: "borrar", align: "center", disablePadding: false, label: "Borrar" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (
            headCell.id === "borrar" &&
            props.user &&
            !props.user.role.permisos.includes("seller")
          )
            return null;
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "center"}
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
const GET_PRODUCTS = gql`
  {
    getProducts {
      id
      name
      value
      stock
    }
  }
`;
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

const PRODUCT_DELETE = gql`
  mutation ($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;

export default function Products(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edit, setEdit] = useState({ open: false, product: null });
  let products = [];
  if (data) {
    products = data.getProducts;
  }
  const closeDialog = () => {
    setEdit({ open: false, rol: null });
  };
  const [deleteProduct] = useMutation(PRODUCT_DELETE, {
    onError: (err) => alert(err),
    onCompleted: () => refetch(),
  });
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" alignItems="center" justifyContent="center" p={3}>
          {user && user.role.permisos.includes("seller") && (
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              onClick={() => setEdit({ open: true, product: null })}
            >
              Añadir
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              user={user}
              classes={classes}
              rowCount={products.length}
            />
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
              ) : products.length < 1 ? (
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
                  {products.map((product) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product.id}
                    >
                      <TableCell
                        onClick={() =>
                          user && user.role.permisos.includes("seller")
                            ? setEdit({ open: true, product: product })
                            : null
                        }
                        style={
                          user && user.role.permisos.includes("seller")
                            ? { cursor: "pointer" }
                            : null
                        }
                        align="center"
                      >
                        {product.name}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          user && user.role.permisos.includes("seller")
                            ? setEdit({ open: true, product: product })
                            : null
                        }
                        style={
                          user && user.role.permisos.includes("seller")
                            ? { cursor: "pointer" }
                            : null
                        }
                        align="center"
                      >
                        {product.value + "$"}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          user && user.role.permisos.includes("seller")
                            ? setEdit({ open: true, product: product })
                            : null
                        }
                        style={
                          user && user.role.permisos.includes("seller")
                            ? { cursor: "pointer" }
                            : null
                        }
                        align="center"
                      >
                        {product.stock}
                      </TableCell>
                      {user && user.role.permisos.includes("seller") && (
                        <TableCell align="center">
                          <Button
                            onClick={() =>
                              deleteProduct({
                                variables: { productId: product.id },
                              })
                            }
                            variant="contained"
                            color="primary"
                            style={{ color: "white" }}
                          >
                            Borrar
                          </Button>
                        </TableCell>
                      )}
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
          <Product
            callback={refetch}
            close={closeDialog}
            product={edit.product}
          />
        )}
      </Paper>
    </div>
  );
}
