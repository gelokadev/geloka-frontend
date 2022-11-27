import React, { lazy } from "react";
import { HOUSE } from "../../../../constants/FrontendUrl";
import { Switch, Route, Redirect } from "react-router-dom";

export const Categories = () => {
  return (
    <Switch>
      <Route path={HOUSE.CATEGORY.LIST} component={lazy(() => import(`./list`))} />
      <Route path={HOUSE.CATEGORY.CREATE} component={lazy(() => import(`./create`))} />
      <Route path={HOUSE.CATEGORY.UPDATE} component={lazy(() => import(`./update`))} />
      <Redirect to={HOUSE.CATEGORY.LIST} />
    </Switch>
  )
}

export default Categories;