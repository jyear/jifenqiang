import * as React from "react";
import * as routerDom from "react-router-dom";
import * as Loadable from "react-loadable";
import NoPath from "./entries/nopath";
import PrivateRoute from "./components/main";
const { Route, Switch, withRouter, Redirect }: any = routerDom;

let pathConfig = [
	{
		name: "Login",
		src: "./entries/login",
		path: "/",
		isPrivate: false
	},
	{
		name: "Dashbord",
		src: "./entries/dashboard",
		path: "/dashboard",
		isPrivate: true
	},
	,
	{
		name: "Advert",
		src: "./entries/advert",
		path: "/advert",
		isPrivate: true
	}
];
let componentObj: any = {};
const createLoadable = function() {
	let res = pathConfig.map((item, index) => {
		componentObj[item.name] = Loadable({
			loader: () => import("" + item.src),
			loading: (): any => null
		});
		if (item.isPrivate) {
			return (
				<PrivateRoute
					key={index}
					path={item.path}
					exact
					component={componentObj[item.name]}
				/>
			);
		} else {
			return (
				<Route
					key={index}
					path={item.path}
					exact
					component={componentObj[item.name]}
				/>
			);
		}
	});
	return res;
};

export default () => {
	return (
		<Switch>
			{createLoadable()}
			<Route path="/404" component={NoPath} />
			<Redirect
				from="*"
				to={{
					pathname: "/404"
				}}
				component={NoPath}
			/>
		</Switch>
	);
};
