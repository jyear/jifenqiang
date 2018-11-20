import * as React from "react";
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
			<div className="nopath">
				<div>
					<div className="t">
						<span className="t1">4</span>
						<span className="t2">0</span>
						<span className="t3">4</span>
					</div>
					<div className="content">
						<div className="detail">页面不存在或无权限</div>
						<span
							className="gohome"
							onClick={this.goHome.bind(this)}
						>
							返回首页
						</span>
					</div>
				</div>
			</div>
		);
	}
}
