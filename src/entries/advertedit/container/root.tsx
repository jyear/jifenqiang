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
	readonly state: any = {
		test: null
	};
	goHome() {
		window.appHistory.push("/");
	}

	render() {
		return (
			<div className="edit-page">
				<DetailHeader title="广告" />
				<div className="edit-box">
					<GroupName title="基本信息" />
					<div className="group">
						<InputBox
							labelName="广告类型"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value={1}
							type="select"
							optionArr={[
								{
									key: 1,
									label: "ASO"
								},
								{
									key: 2,
									label: "CPA"
								}
							]}
						/>
						<InputBox
							labelName="广告名称"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="广告主"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value={[1]}
							showSearch={true}
							type="select"
							isFetch={true}
							optionArr={[
								{
									key: 1,
									label: "ASO"
								},
								{
									key: 2,
									label: "CPA"
								}
							]}
						/>
						<InputBox
							labelName="结算单价"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value={2}
							type="number"
						/>
						<InputBox
							labelName="推广要求"
							onChange={this.InputChange.bind(this)}
							value="2"
							type="textarea"
							flexTop={true}
						/>
					</div>
					<GroupName title="广告素材" />
					<div className="group">
						<InputBox
							labelName="应用名称"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="LOGO"
							onChange={this.InputChange.bind(this)}
							length={1}
							limitType={["jpg", "png", "jpeg"]}
							type="uploader-img"
						/>
						<InputBox
							labelName="App ID"
							isMust={true}
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="Itunes链接"
							onChange={this.InputChange.bind(this)}
							value="2"
						/>
						<InputBox
							labelName="上传安装包"
							isMust={true}
							onChange={this.InputChange.bind(this, "test")}
							type="uploader"
							flexTop={true}
							length={1}
							desc="文件扩展名必须是.apk"
						/>
						<InputBox
							labelName="包名"
							onChange={this.InputChange.bind(this)}
							value=""
							placeholder="上传文件后自动获取文件名"
							disabled
						/>
						<InputBox
							labelName="大小"
							onChange={this.InputChange.bind(this)}
							placeholder="上传文件后自动获取文件大小"
							value=""
							disabled
						/>
						<InputBox
							labelName="应用简介"
							onChange={this.InputChange.bind(this)}
							value="2"
							flexTop={true}
							type="textarea"
						/>
						<InputBox
							labelName="应用截图"
							onChange={this.InputChange.bind(this)}
							type="uploader-img"
							multiple={true}
							limitType={["jpg", "png", "jpeg"]}
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
