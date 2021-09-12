import React, { memo, useState, Fragment } from "react";
import {
  FormLabel,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  MenuItem,
  Select,
  Input,
  Box,
  InputLabel,
  TextField,
  withStyles,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { useMutation } from "@apollo/client";

import gql from "graphql-tag";
import HighlightedInformation from "../shared/HighlightedInformation";

const ADD_ADMIN = gql`
  mutation ($name: String!, $value: Float!, $permisos: [Permiso]) {
    createRole(roleInput: { name: $name, value: $value, permisos: $permisos }) {
      id
      name
      permisos
      value
    }
  }
`;
const EDIT_ADMIN = gql`
  mutation ($roleId: ID!, $name: String, $value: Float, $permisos: [Permiso]) {
    updateRole(
      roleInput: {
        roleId: $roleId
        name: $name
        value: $value
        permisos: $permisos
      }
    ) {
      id
      name
      permisos
      value
    }
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  dialog: {
    backgroundColor: theme.palette.secondary.main,
    padding: 20,
  },
  dropzone: {
    backgroundColor: theme.palette.secondary.main,
  },
  whiteInput: {
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  borderMinus: {
    borderRadius: 14,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  select: {
    minWidth: 120,
  },
  chip: {
    margin: 2,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    minHeight: "56px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      opacity: 0.8,
    },
  },
}))(Button);

function Role(props) {
  const { classes, callback, close, role } = props;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    role
      ? {
          roleId: role.id,
          name: role.name,
          permisos: role.permisos,
          value: role.value,
        }
      : {
          name: "",
          permisos: [],
          value: 0,
        }
  );
  const [addCategory, { loading: mutationLoading }] = useMutation(
    role ? EDIT_ADMIN : ADD_ADMIN,
    {
      variables: {
        ...formData,
        stock: parseInt(formData.stock),
        value: parseFloat(formData.value),
      },
      onCompleted: () => {
        callback();
        close();
      },
      onError: (err) => {
        setErrors({
          ...err.graphQLErrors[0].extensions.errors,
        });
      },
    }
  );

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = () => {
    addCategory();
  };
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={() => close()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box>
          <FormLabel>Añada un rol</FormLabel>
          <br />
          <br />
          <Fragment>
            <Box width="100%">
              <TextField
                fullWidth={true}
                value={formData.name}
                name="name"
                onChange={handleChange}
                label="Nombre del rol"
              />
            </Box>
            <br />
            <Box width="100%">
              <InputLabel id="role-input">Permisos del rol</InputLabel>

              <Select
                labelId="role-input"
                id="permisos"
                autoWidth
                fullWidth
                className={classes.select}
                required
                multiple
                name="permisos"
                value={formData.permisos}
                onChange={handleChange}
                input={<Input id="permisos" />}
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="seller">Vendedor</MenuItem>
              </Select>
            </Box>
            <br />
            <Box width="100%">
              <TextField
                fullWidth={true}
                type="number"
                value={formData.value}
                name="value"
                onChange={handleChange}
                label="Valor del rol"
              />
            </Box>

            {Object.keys(errors).length !== 0 && (
              <Fragment>
                <br />
                <br />
                <HighlightedInformation>
                  {Object.values(errors).map((err, i, array) => {
                    return (
                      <Fragment key={i}>
                        {`*${err}`} <br />{" "}
                        {array.length - 1 !== i ? <br /> : ""}
                      </Fragment>
                    );
                  })}
                </HighlightedInformation>
              </Fragment>
            )}
          </Fragment>
        </Box>
      </DialogContent>
      <DialogActions>
        <ColorButton
          className={classes.borderMinus}
          onClick={() => close()}
          color="default"
        >
          Cancelar
        </ColorButton>
        <ColorButton
          className={classes.borderMinus}
          onClick={handleSubmit}
          color="default"
          autoFocus
          disabled={mutationLoading}
        >
          {role ? "Editar" : "Añadir"}
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(memo(Role));
