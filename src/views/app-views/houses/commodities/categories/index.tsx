import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HOUSE } from "../../../../../constants/FrontendUrl";

export const Commodities = () => {
  return (
    <Switch>
      <Route path={HOUSE.COMMODITY.CATEGORY.LIST} component={lazy(() => import(`./list`))} />
      <Route path={HOUSE.COMMODITY.CATEGORY.CREATE} component={lazy(() => import(`./create`))} />
      <Route path={HOUSE.COMMODITY.CATEGORY.UPDATE} component={lazy(() => import(`./update`))} />
      <Redirect to={HOUSE.COMMODITY.CATEGORY.LIST} />
    </Switch>
  )
}

export default Commodities;