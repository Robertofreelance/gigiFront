import React, { useState, Fragment, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import HighlightedInformation from "../shared/HighlightedInformation";
import { AuthContext } from "../context/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
      CONTROL DE INVENTARIO Y NÓMINA DE LA PANADERÍA Y PASTELERÍA VENEZUELA III
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      opacity: 0.9,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
}));

const Login_ESTABLECIMIENTO_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
    }
  }
`;

export default function SignIn(props) {
  const { login, admin } = useContext(AuthContext);

  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [registerEstablecimiento, { loading }] = useMutation(
    Login_ESTABLECIMIENTO_MUTATION,
    {
      onCompleted: (data) => {
        login(data.login);
      },
      variables: { ...formData },
      onError: (err) => {
        setErrors({ ...errors, ...err.graphQLErrors[0].extensions.errors });
      },
    }
  );

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    registerEstablecimiento();
  };
  if (admin) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <Container component="main" className={classes.container} maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.email}
                  id="email"
                  onChange={handleChange}
                  label="Correo electronico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  label="Contraseña"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <br />
            {Object.keys(errors).length !== 0 && (
              <HighlightedInformation>
                {Object.entries(errors).map(([, err], i, array) => {
                  return (
                    <Fragment key={i}>
                      {`*${err}`} <br /> {array.length - 1 !== i ? <br /> : ""}
                    </Fragment>
                  );
                })}
              </HighlightedInformation>
            )}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
}
