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
  mutation (
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
    $genero: Gender!
    $role: ID!
    $edad: Int!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        genero: $genero
        role: $role
        edad: $edad
      }
    ) {
      id
      username
      password
      email
      genero
      createdAt
      role {
        id
        name
      }
      edad
    }
  }
`;
const EDIT_ADMIN = gql`
  mutation (
    $id: String!
    $username: String
    $password: String
    $confirmPassword: String
    $email: String
    $genero: Gender
    $role: ID
    $edad: Int
  ) {
    updateUser(
      updateUserInput: {
        id: $id
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        genero: $genero
        role: $role
        edad: $edad
      }
    ) {
      id
      username
      password
      email
      genero
      createdAt
      role {
        id
        name
      }
      edad
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

function Admin(props) {
  const { classes, callback, close, admin, roles } = props;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    admin
      ? {
          id: admin.id,
          password: "",
          confirmPassword: "",
          username: admin.username,
          role: admin.role.id,
          email: admin.email,
          edad: admin.edad,
          genero: admin.genero,
        }
      : {
          password: "",
          confirmPassword: "",
          email: "",
          username: "",
          role: "",
          edad: 10,
          genero: "",
        }
  );
  const [addCategory, { loading: mutationLoading }] = useMutation(
    admin ? EDIT_ADMIN : ADD_ADMIN,
    {
      variables: formData,
      onCompleted: () => {
        callback();
        close();
      },
      onError: (err) => {
        setErrors({
          ...err.graphQLErrors[0].extensions.errors,
        })
      }
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
          <FormLabel>Añada el administrador</FormLabel>
          <br />
          <br />
          <Fragment>
            <Box width="100%">
              <TextField
                fullWidth={true}
                value={formData.username}
                name="username"
                onChange={handleChange}
                label="Nombre de administrador"
              />
            </Box>
            <br />
            <Box width="100%">
              <TextField
                fullWidth={true}
                value={formData.email}
                name="email"
                onChange={handleChange}
                label="Correo de administrador"
              />
            </Box>
            <br />
            <Box width="100%">
              <TextField
                fullWidth={true}
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                label="Contraseña de administrador"
              />
            </Box>
            <br />
            <Box width="100%">
              <TextField
                fullWidth={true}
                type="password"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                label="Repita contraseña"
              />
            </Box>
            <br />
            <br />
            <Box width="100%">
              <InputLabel id="genero-input">Genero</InputLabel>

              <Select
                labelId="genero-input"
                id="genero"
                autoWidth
                fullWidth
                className={classes.select}
                required
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                input={<Input id="genero" />}
              >
                <MenuItem value="Hombre">Hombre</MenuItem>
                <MenuItem value="Mujer">Mujer</MenuItem>
              </Select>
            </Box>
            <br />

            <Box width="100%">
              <InputLabel id="role-input">Rol</InputLabel>

              <Select
                labelId="role-input"
                id="role"
                autoWidth
                fullWidth
                className={classes.select}
                required
                name="role"
                value={formData.role}
                onChange={handleChange}
                input={<Input id="role" />}
              >
                {roles.getRoles.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <br />

            <Box width="100%">
              <InputLabel id="edad-input">Edad</InputLabel>

              <Select
                labelId="edad-input"
                id="edad"
                autoWidth
                fullWidth
                className={classes.select}
                required
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                input={<Input id="edad" />}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={29}>29</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={31}>31</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={33}>33</MenuItem>
                <MenuItem value={34}>34</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
                <MenuItem value={39}>39</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={41}>41</MenuItem>
                <MenuItem value={42}>42</MenuItem>
                <MenuItem value={43}>43</MenuItem>
                <MenuItem value={44}>44</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={46}>46</MenuItem>
                <MenuItem value={47}>47</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={49}>49</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={51}>51</MenuItem>
                <MenuItem value={52}>52</MenuItem>
                <MenuItem value={53}>53</MenuItem>
                <MenuItem value={54}>54</MenuItem>
                <MenuItem value={55}>55</MenuItem>
                <MenuItem value={56}>56</MenuItem>
                <MenuItem value={57}>57</MenuItem>
                <MenuItem value={58}>58</MenuItem>
                <MenuItem value={59}>59</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={61}>61</MenuItem>
                <MenuItem value={62}>62</MenuItem>
                <MenuItem value={63}>63</MenuItem>
                <MenuItem value={64}>64</MenuItem>
                <MenuItem value={65}>65</MenuItem>
                <MenuItem value={66}>66</MenuItem>
                <MenuItem value={67}>67</MenuItem>
                <MenuItem value={68}>68</MenuItem>
                <MenuItem value={69}>69</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={71}>71</MenuItem>
                <MenuItem value={72}>72</MenuItem>
                <MenuItem value={73}>73</MenuItem>
                <MenuItem value={74}>74</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={76}>76</MenuItem>
                <MenuItem value={77}>77</MenuItem>
                <MenuItem value={78}>78</MenuItem>
                <MenuItem value={79}>79</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={81}>81</MenuItem>
                <MenuItem value={82}>82</MenuItem>
                <MenuItem value={83}>83</MenuItem>
                <MenuItem value={84}>84</MenuItem>
                <MenuItem value={85}>85</MenuItem>
                <MenuItem value={86}>86</MenuItem>
                <MenuItem value={87}>87</MenuItem>
                <MenuItem value={88}>88</MenuItem>
                <MenuItem value={89}>89</MenuItem>
                <MenuItem value={90}>90</MenuItem>
                <MenuItem value={91}>91</MenuItem>
                <MenuItem value={92}>92</MenuItem>
                <MenuItem value={93}>93</MenuItem>
                <MenuItem value={94}>94</MenuItem>
                <MenuItem value={95}>95</MenuItem>
                <MenuItem value={96}>96</MenuItem>
                <MenuItem value={97}>97</MenuItem>
                <MenuItem value={98}>98</MenuItem>
                <MenuItem value={99}>99</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={101}>101</MenuItem>
                <MenuItem value={102}>102</MenuItem>
                <MenuItem value={103}>103</MenuItem>
                <MenuItem value={104}>104</MenuItem>
                <MenuItem value={105}>105</MenuItem>
                <MenuItem value={106}>106</MenuItem>
                <MenuItem value={107}>107</MenuItem>
                <MenuItem value={108}>108</MenuItem>
                <MenuItem value={109}>109</MenuItem>
              </Select>
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
          disabled={
            formData.genero === "" || formData.role === "" || mutationLoading
          }
        >
          {admin ? "Editar" : "Añadir"}
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(memo(Admin));
