import * as React from "react";
import { Button } from "antd";
import "./index.less";
import EditPage from "../../../@mixin/editpage/";
import DetailHeader from "../../../components/detail_header/";
import InputBox from "../../../components/inputbox/";
import GroupName from "../../../components/groupname/";
interface Props {}
export default class Root extends EditPage<Props, any> {
	constructor(props: any) {
		super(props);
	}
	readonly state = {};
	goHome() {
		window.appHistory.push("/");
	}

	render() {
		return (
			<div className="edit-page">
				<DetailHeader title="应用信息" />
				<div className="edit-box">
					<GroupName title="应用信息" />
					<div className="group">
						<InputBox
							labelName="平台"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="应用名称"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
							disabled
						/>
						<InputBox
							labelName="应用简介"
							onChange={this.InputChange.bind(this)}
							value="2"
							type="textarea"
						/>

						<InputBox
							labelName="应用包名/APP ID"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
							disabled
						/>
						<InputBox
							labelName="回调地址"
							onChange={this.InputChange.bind(this)}
							value="2"
							flexTop={true}
						/>
						<InputBox
							labelName="返奖比例"
							onChange={this.InputChange.bind(this)}
							value="2"
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
