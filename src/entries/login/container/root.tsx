import * as React from "react";
import { Input, Button } from "antd";
import "./index.less";
interface Props {}
export default class Root extends React.PureComponent<Props, any> {
	constructor(props: any) {
		super(props);
	}
	goHome() {
		window.appHistory.push("/");
	}
	render() {
		return (
			<div className="login-page">
				<div className="login-box">
					<div className="login-title">积分墙后台管理系统</div>
					<div className="input_item ui ac">
						{/* <span className="name">用户名：</span> */}
						<div className="f1">
							<Input className="input" placeholder="用户名" />
						</div>
					</div>
					<div className="input_item ui ac">
						{/* <span className="name">密码：</span> */}
						<div className="f1">
							<Input
								className="input"
								type="password"
								placeholder="密码"
							/>
						</div>
					</div>
					<div className="input_item">
						<Button className="btn" type="primary">
							登陆
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
