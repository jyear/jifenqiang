import * as React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import MenuBox from "../menubox/";
import TopBar from "../topbar";
let userInfo: any, authArr: string[];
const init = function() {};
const getFakeAuth = function(): boolean {
	authArr = ["/", "/dashboard", "/404"];
	return true;
};
const getPageAuth = function(path: string): boolean {
	if (authArr.indexOf(path) != -1) {
		return true;
	}
	return false;
};
const PrivateRoute = ({ component: Component, ...rest }: any) => (
	<Route
		{...rest}
		render={props => {
			init();

			return getFakeAuth() ? (
				getPageAuth(rest.location.pathname) ? (
					<div className="mainbox">
						<div className="left">
							<div className="title">积分墙</div>
							<MenuBox {...rest} />
						</div>
						<div className="right">
							<TopBar />
							<Component {...rest} />
						</div>
					</div>
				) : (
					<Redirect
						to={{
							pathname: "/404",
							state: { from: location }
						}}
					/>
				)
			) : (
				<Redirect
					to={{
						pathname: "/",
						state: { from: location }
					}}
				/>
			);
		}}
	/>
);
export default PrivateRoute;
