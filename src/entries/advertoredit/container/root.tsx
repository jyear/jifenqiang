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
				<DetailHeader title="广告主" />
				<div className="edit-box">
					<GroupName title="基本信息" />
					<div className="group">
						<InputBox
							labelName="公司名称"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="社会统一信用代码"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="法人姓名"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="法人身份证"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="营业执照"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="备注"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
							type="textarea"
							flexTop={true}
						/>
					</div>
					<GroupName title="联系人" />
					<div className="group">
						<InputBox
							labelName="姓名"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="职务"
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="手机"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="QQ"
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="邮箱"
							onChange={this.InputChange.bind(this)}
							value="2"
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
