import * as React from "react";

import "./index.less";
import DetailHeader from "../../../components/detail_header/";
import DetailItem from "../../../components/detailitem/";
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
				<DetailHeader title="用户详情" />
				<div className="edit-box">
					<GroupName title="基本信息" />
					<div className="group">
						<DetailItem labelName="用户ID" content="sdasdsa" />
						<DetailItem labelName="真实姓名" content="sdasdsa" />
						<DetailItem labelName="性别" content="" />
						<br />
						<DetailItem labelName="注册时间" content="sdasdsa" />
						<DetailItem labelName="来源" content="sdasdsa" />
						<br />
						<DetailItem labelName="信用等级" content="sdasdsa" />
						<DetailItem labelName="累积收入" content="sdasdsa" />
					</div>
					<GroupName title="设备信息" />
					<div className="group">
						<DetailItem labelName="平台" content="sdasdsa" />
						<DetailItem labelName="设备名称" content="sdasdsa" />
						<DetailItem
							labelName="UUid"
							content="sdasdsasdasdsasdasdsasdasdsasdasdsasdasdsasdasdsasdasdsasdasdsasdasdsasdasdsa"
						/>
						<br />
						<DetailItem labelName="IMEI" content="sdasdsa" />
						<DetailItem labelName="IDFA" content="sdasdsa" />
						<br />
						<DetailItem labelName="设备品牌" content="sdasdsa" />
						<DetailItem labelName="设备型号" content="sdasdsa" />
						<br />
						<DetailItem labelName="是否Root" content="sdasdsa" />
						<DetailItem labelName="是否有SIM卡" content="sdasdsa" />
					</div>
				</div>
			</div>
		);
	}
}
