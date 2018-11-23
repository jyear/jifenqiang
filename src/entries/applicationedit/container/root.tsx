import * as React from "react";
import { Button } from "antd";
import "./index.less";
import DetailHeader from "../../../components/detail_header/";
import InputBox from "../../../components/inputbox/";
import GroupName from "../../../components/groupname/";
interface Props {}
export default class Root extends React.PureComponent<Props, any> {
	constructor(props: any) {
		super(props);
	}
	readonly state = {};
	goHome() {
		window.appHistory.push("/");
	}
	InputChange() {}
	render() {
		return (
			<div className="edit-page">
				<DetailHeader title="应用市场" />
				<div className="edit-box">
					<GroupName title="应用市场信息" />
					<div className="group">
						<InputBox
							labelName="应用市场名称"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="上传安装包"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="包名"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
							disabled
						/>
						<InputBox
							labelName="大小"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
							disabled
						/>
						<InputBox
							labelName="备注"
							onChange={this.InputChange.bind(this)}
							value="2"
							type="textarea"
							flexTop={true}
						/>
					</div>
					<div className="btnbox">
						<Button className="save-btn" type="primary">
							保存
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
