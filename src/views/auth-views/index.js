import { lazy, Suspense } from "react";
import { AUTH } from '../../constants/FrontendUrl';
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from '../../components/shared-components/Loading';

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Switch>
        <Route path={AUTH.LOGIN} component={lazy(() => import(`./authentication/login`))} />
        <Redirect to={AUTH.LOGIN} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;

