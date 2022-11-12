import AuthViews from '../../views/auth-views'
import { Switch, Route, } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div className="auth-container">
			<Switch>
				<Route path="" component={AuthViews} />
			</Switch>
		</div>
	)
}


export default AuthLayout
