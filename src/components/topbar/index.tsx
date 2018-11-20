import * as React from "react";
import { Icon } from "antd";
import "./index.less";
interface Props {}

export default class TopBar extends React.PureComponent<Props> {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<div className="top-bar">
				<div className="top-left" />
				<Icon type="user" className="usericon" />
				<div className="username">
					当前用户：<span>张三丰</span>
				</div>
				<Icon type="logout" className="logout" title="退出" />
			</div>
		);
	}
}
