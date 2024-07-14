import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import * as FrontUrl from '../../../constants/FrontendUrl';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PopularPlaceType } from '../../../models/PopularPlace';

const PopularPlaces = (props: any) => {
	const { match } = props
	return (
		<Switch>
			<Route path={FrontUrl.POPULAR_PLACE.CITY.LIST} render={(props) => <List type={PopularPlaceType.CITY} {...props} />} />
			<Route path={FrontUrl.POPULAR_PLACE.CITY.CREATE} render={(props) => <Create type={PopularPlaceType.CITY} {...props} />} />
			<Route path={FrontUrl.POPULAR_PLACE.CITY.UPDATE} render={(props) => <Update type={PopularPlaceType.CITY} {...props} />} />
			<Route path={FrontUrl.POPULAR_PLACE.POINT.LIST} render={(props) => <List type={PopularPlaceType.POINT} {...props} />} />
			<Route path={FrontUrl.POPULAR_PLACE.POINT.CREATE} render={(props) => <Create type={PopularPlaceType.POINT} {...props} />} />
			<Route path={FrontUrl.POPULAR_PLACE.POINT.UPDATE} render={(props) => <Update type={PopularPlaceType.POINT} {...props} />} />
			<Redirect exact from={`${match.url}`} to={FrontUrl.POPULAR_PLACE.CITY.LIST} />
		</Switch>
	)
}

export default PopularPlaces;