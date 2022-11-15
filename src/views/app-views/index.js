import React, { lazy, Suspense } from "react";
import * as FrontUrl from '../../constants/FrontendUrl';
import { APP_PREFIX_PATH } from '../../configs/AppConfig'
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from '../../components/shared-components/Loading';

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={FrontUrl.HOME} component={lazy(() => import(`./home`))} />
        <Route path={FrontUrl.HOUSE} component={lazy(() => import(`./houses`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={FrontUrl.HOME} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);