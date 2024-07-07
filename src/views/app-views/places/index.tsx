import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import * as FrontUrl from '../../../constants/FrontendUrl';
import { Route, Switch, Redirect } from 'react-router-dom';

const PopularPlaces = (props: any) => {
	const { match } = props
	return (
		<Switch>
			<Route path={FrontUrl.POPULAR_PLACE.CITY.LIST} component={List} />
			<Route path={FrontUrl.POPULAR_PLACE.CITY.CREATE} component={Create} />
			<Route path={FrontUrl.POPULAR_PLACE.CITY.UPDATE} component={Update} />
			<Redirect exact from={`${match.url}`} to={FrontUrl.POPULAR_PLACE.CITY.LIST} />
		</Switch>
	)
}

export default PopularPlaces;