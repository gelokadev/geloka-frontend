import React from 'react';
import Lessors from './lessors';
import * as FrontUrl from '../../../constants/FrontendUrl';
import { Route, Switch, Redirect } from 'react-router-dom';

const Users = (props: any) => {
	const { match } = props
	return (
		<Switch>
			<Route path={FrontUrl.USER.LESSOR.SELF} component={Lessors} />
			<Redirect exact from={`${match.url}`} to={FrontUrl.USER.LESSOR.SELF} />
		</Switch>
	)
}

export default Users;