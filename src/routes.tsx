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
	{
		name: "Advert",
		src: "./entries/advert",
		path: "/advert",
		isPrivate: true
	},
	{
		name: "Advertor",
		src: "./entries/advertor",
		path: "/advertor",
		isPrivate: true
	},
	{
		name: "Application",
		src: "./entries/application",
		path: "/application",
		isPrivate: true
	},
	{
		name: "Apply",
		src: "./entries/apply",
		path: "/apply",
		isPrivate: true
	},
	{
		name: "User",
		src: "./entries/user",
		path: "/user",
		isPrivate: true
	},
	{
		name: "Developer",
		src: "./entries/developer",
		path: "/developer",
		isPrivate: true
	},
	{
		name: "Manager",
		src: "./entries/manager",
		path: "/manager",
		isPrivate: true
	},
	{
		name: "Role",
		src: "./entries/role",
		path: "/role",
		isPrivate: true
	},
	{
		name: "DevApp",
		src: "./entries/devapp",
		path: "/devapp",
		isPrivate: true
	},
	//编辑页面
	{
		name: "AdvertorEdit",
		src: "./entries/advertoredit",
		path: "/advertor/edit",
		isPrivate: true
	},
	{
		name: "ApplicationEdit",
		src: "./entries/applicationedit",
		path: "/application/edit",
		isPrivate: true
	},
	{
		name: "DeveloperEdit",
		src: "./entries/developeredit",
		path: "/developer/edit",
		isPrivate: true
	},
	{
		name: "DevAppEdit",
		src: "./entries/devappedit",
		path: "/devapp/edit",
		isPrivate: true
	},
	{
		name: "ManagerEdit",
		src: "./entries/manageredit",
		path: "/manager/edit",
		isPrivate: true
	},
	{
		name: "RoleEdit",
		src: "./entries/roleedit",
		path: "/role/edit",
		isPrivate: true
	},
	//详情页
	{
		name: "UserDetail",
		src: "./entries/userdetail",
		path: "/user/detail",
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
