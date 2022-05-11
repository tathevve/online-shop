import React from "react";
import {Route, Switch} from "react-router-dom";
import Bag from "./pages/Bag";
import Home from "./pages/Home";

const Routes = () => {
    return (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bag" exact component={Bag} />

        </Switch>
    );
  };
  
  export default Routes;