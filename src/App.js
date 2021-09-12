import React, { Fragment, Suspense, useContext } from "react";
import "./App.css";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import theme from "./theme";
import { AuthContext } from "./context/auth";
import GlobalStyles from "./GlobalStyles";
import Principal from "./dashboard/Principal";
import Login from "./Authorization/Login";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {!user && <Redirect to="/login" />}
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Principal} />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
