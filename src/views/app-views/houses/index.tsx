import React from 'react';
import Commodities from './commodities';
import * as FrontUrl from '../../../constants/FrontendUrl';
import { Route, Switch, Redirect } from 'react-router-dom';

const Houses = (props: any) => {
	const { match } = props
	return (
		<Switch>
			<Route path={FrontUrl.HOUSE.COMMODITY.SELF} component={Commodities} />
			<Redirect exact from={`${match.url}`} to={FrontUrl.HOUSE.COMMODITY.SELF} />
		</Switch>
	)
}

export default Houses;