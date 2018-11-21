import * as React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
interface Props {
	path: any;
}
export default class MenuBox extends React.PureComponent<Props, object> {
	public navList: any[];
	constructor(props: any) {
		super(props);
		this.state = {};
		this.navList = [
			{
				isGroup: true,
				_name: "数据统计",
				_icon: "dashboard",
				_id: 0,
				child: [
					{
						_url: "/dashboard",
						_name: "整体趋势",
						_id: 1
					}
				]
			},
			{
				isGroup: true,
				_name: "广告管理",
				_icon: "shopping",
				_id: 2,
				child: [
					{
						_url: "/advert",
						_name: "广告列表",
						_id: 3
					},
					{
						_url: "/advertor",
						_name: "广告主列表",
						_id: 4
					},
					{
						_url: "/applicate",
						_name: "应用市场列表",
						_id: 5
					},
					{
						_url: "/apply",
						_name: "审核列表",
						_id: 6
					}
				]
			},
			{
				isGroup: true,
				_name: "用户管理",
				_icon: "snippets",
				_id: 7,
				child: [
					{
						_url: "/user",
						_name: "用户列表",
						_id: 8
					}
				]
			},
			{
				isGroup: true,
				_name: "开发者管理",
				_icon: "highlight",
				_id: 9,
				child: [
					{
						_url: "/user",
						_name: "开发者列表",
						_id: 10
					}
				]
			},
			{
				isGroup: true,
				_name: "系统设置",
				_icon: "setting",
				_id: 11,
				child: [
					{
						_url: "/manager",
						_name: "管理员列表",
						_id: 12
					},
					{
						_url: "/role",
						_name: "角色管理",
						_id: 13
					}
				]
			}
		];
	}
	public setMenu(path: string) {
		var pathname = path.toLowerCase();
		var number: number, key: any;
		this.navList.map((item, idx) => {
			if (!item.isGroup) {
				let path = item._url;
				var reg = new RegExp("^" + path + "/");
				if (pathname == item._url || reg.test(pathname)) {
					key = idx;
				}
			}
			if (item.isGroup && item.child && item.child.length > 0) {
				item.child.map((v: any, k: number) => {
					let path = v._url;
					var reg = new RegExp("^" + path + "/");
					if (pathname == v._url || reg.test(pathname)) {
						number = idx;
						key = `${idx}_${k}`;
					}
				});
			}
		});
		let res: any = {
			defaultSelectedKeys: [`sub_${key}`]
		};
		if (number != null) {
			res.defaultOpenKeys = [`sub_${number}`];
		}
		return res;
	}
	public componentWillMount() {
		//console.log(this.props);
	}
	public render() {
		let navList = this.navList;
		let { path } = this.props;
		return (
			<div className="menu-box">
				<Menu
					theme="dark"
					mode="inline"
					forceSubMenuRender={true}
					{...this.setMenu(path)}
				>
					{navList &&
						navList.length > 0 &&
						navList.map((item: any, index: number) => {
							if (item.isGroup) {
								return (
									<SubMenu
										key={"sub_" + index}
										title={
											<span>
												<Icon type={item._icon} />
												{item._name}
											</span>
										}
									>
										{item.child &&
											item.child.length > 0 &&
											item.child.map(
												(v: any, i: number) => {
													return (
														<Menu.Item
															key={
																"sub_" +
																index +
																"_" +
																i
															}
														>
															{path !==
																v._url && (
																<Link
																	to={{
																		pathname:
																			v._url
																	}}
																>
																	{v._name}
																</Link>
															)}
															{path ===
																v._url && (
																<span>
																	{v._name}
																</span>
															)}
														</Menu.Item>
													);
												}
											)}
									</SubMenu>
								);
							} else {
								return (
									<Menu.Item key={"sub_" + index}>
										{path !== item.path && (
											<Link
												to={{
													pathname: item._url
												}}
											>
												<Icon type={item._icon} />
												{item._name}
											</Link>
										)}
										{path === item._url && (
											<span>
												<Icon type={item._icon} />
												{item._name}
											</span>
										)}
									</Menu.Item>
								);
							}
						})}
				</Menu>
			</div>
		);
	}
}
