import React, { lazy } from "react";
import * as FrontUrl from '../../../../constants/FrontendUrl';
import { Route, Switch, Redirect } from 'react-router-dom';

const Lessors = (props: any) => {
	return (
		<Switch>
		<Route path={FrontUrl.USER.LESSOR.LIST} component={lazy(() => import(`./list`))} />
		<Redirect to={FrontUrl.USER.LESSOR.LIST} />
	  </Switch>
	)
}

export default Lessors;