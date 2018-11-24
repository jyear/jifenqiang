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
				<DetailHeader title="管理员" />
				<div className="edit-box">
					<GroupName title="管理员信息" />
					<div className="group">
						<InputBox
							labelName="姓名"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="角色"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="1"
							type="select"
							optionArr={[
								{
									value: 0,
									label: "测试"
								},
								{
									value: 1,
									label: "测试2"
								}
							]}
						/>
						<InputBox
							labelName="邮箱(登陆账号)"
							onChange={this.InputChange.bind(this)}
							value="2"
						/>

						<InputBox
							labelName="密码"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="确认密码"
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
