import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Login from "views/Login.js";
import ProtectedRoute from "components/ProtectedRoute";
import { keycloak } from "services/api.config";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { ReactKeycloakProvider  } from "@react-keycloak/web";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </ReactKeycloakProvider>
);
