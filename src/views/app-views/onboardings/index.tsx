import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ONBOARDING } from "../../../constants/FrontendUrl";

export const Onboardings = () => {
  return (
    <Switch>
      <Route path={ONBOARDING.LIST} component={lazy(() => import(`./list`))} />
      <Route path={ONBOARDING.CREATE} component={lazy(() => import(`./create`))} />
      <Route path={ONBOARDING.UPDATE} component={lazy(() => import(`./update`))} />
      <Redirect to={ONBOARDING.LIST} />
    </Switch>
  )
}

export default Onboardings;