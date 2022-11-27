import React, { lazy } from "react";
import { HOUSE } from "../../../../constants/FrontendUrl";
import { Switch, Route, Redirect } from "react-router-dom";

export const Commodities = () => {
  return (
    <Switch>
      <Route path={HOUSE.COMMODITY.LIST} component={lazy(() => import(`./list`))} />
      <Route path={HOUSE.COMMODITY.CREATE} component={lazy(() => import(`./create`))} />
      <Route path={HOUSE.COMMODITY.CATEGORY.SELF} component={lazy(() => import(`./categories`))} />
      <Redirect to={HOUSE.COMMODITY.LIST} />
    </Switch>
  )
}

export default Commodities;