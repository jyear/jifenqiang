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
				isGroup: false,
				_name: "数据统计",
				_icon: "dashboard",
				_url: "/dashboard",
				_id: 0
			},
			{
				isGroup: false,
				_name: "广告商",
				_icon: "shopping",
				_url: "/advertiser",
				_id: 1
			},
			{
				isGroup: false,
				_name: "广告管理",
				_icon: "snippets",
				_url: "/advert",
				_id: 2
			},
			{
				isGroup: false,
				_name: "广告平台",
				_icon: "highlight",
				_url: "/publish",
				_id: 3
			},
			{
				isGroup: false,
				_name: "广告投放",
				_icon: "bg-colors",
				_url: "/launch",
				_id: 4
			},
			{
				isGroup: false,
				_name: "第三方开发管理",
				_icon: "code",
				_url: "/developer",
				_id: 5
			},
			{
				isGroup: true,
				_name: "系统设置",
				_icon: "setting",
				child: [
					{
						_url: "/manager",
						_name: "管理员列表",
						_id: 6
					},
					{
						_url: "/role",
						_name: "角色管理",
						_id: 7
					},
					{
						_url: "/tag",
						_name: "标签管理",
						_id: 8
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
			selectedKeys: [`sub_${key}`]
		};
		if (number) {
			res.openKeys = [`sub_${number}`];
		}
		return res;
	}
	public componentWillMount() {
		console.log(this.props);
	}
	public render() {
		let navList = this.navList;
		let { path } = this.props;
		return (
			<div className="menu-box">
				<Menu theme="dark" mode="inline" {...this.setMenu(path)}>
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
