import * as React from "react";
import { Tabs } from "antd";
import "./index.less";
import DetailHeader from "../../../components/detail_header/";
import DetailItem from "../../../components/detailitem/";
import GroupName from "../../../components/groupname/";
import Table from "../components/table/";
const TabPane = Tabs.TabPane;
interface Props {}
interface State {
	table1: TableValue;
	table2: TableValue;
	table3: TableValue;
	table4: TableValue;
}
interface TableValue {
	page: number;
	pageSize: number;
}
export default class Root extends React.PureComponent<Props, State> {
	constructor(props: any) {
		super(props);
	}
	readonly state = {
		table1: {
			page: 1,
			pageSize: 30
		},
		table2: {
			page: 1,
			pageSize: 30
		},
		table3: {
			page: 1,
			pageSize: 30
		},
		table4: {
			page: 1,
			pageSize: 30
		}
	};
	goHome() {
		window.appHistory.push("/");
	}

	renderTable1Header(): any[] {
		return [
			{
				name: "创建时间",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "任务订单ID",
				key: "time",
				width: 150,
				class: "tc",
				render: (item: any) => <span>张三丰</span>
			},
			{
				name: "任务ID",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "任务名称",
				key: "time",
				width: 150,
				class: "tc"
			},
			{
				name: "平台",
				key: "time",
				width: 150,
				class: "tc"
			},
			{
				name: "应用",
				key: "time",
				width: 150,
				class: "tc"
			},
			{
				name: "订单状态",
				key: "time",
				width: 150,
				class: "tc"
			},
			{
				name: "金额变动",
				key: "time",
				width: 150,
				class: "tc"
			},
			{
				name: "订单详情",
				key: "time",
				width: 150,
				class: "tc"
			}
		];
	}
	renderTable2Header(): any[] {
		return [
			{
				name: "时间",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "登陆IP",
				key: "time",
				class: "tc"
			},
			{
				name: "平台",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "登陆应用",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "应用账号",
				key: "time",
				class: "tc",
				width: 150
			}
		];
	}
	renderTable3Header(): any[] {
		return [
			{
				name: "更新时间",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "应用名称",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "已安装应用记录",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "平台",
				key: "time",
				class: "tc",
				width: 150
			}
		];
	}
	renderTable4Header(): any[] {
		return [
			{
				name: "更新时间",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "积分变动原因",
				key: "time",
				class: "tc"
			},
			{
				name: "积分变动",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "累计积分",
				key: "time",
				class: "tc",
				width: 150
			},
			{
				name: "信用等级",
				key: "time",
				class: "tc",
				width: 150
			}
		];
	}
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
					<GroupName title="行为记录" />
					<Tabs defaultActiveKey="1">
						<TabPane tab="任务订单记录" key="1">
							<Table
								data={[{}]}
								headerList={this.renderTable1Header()}
								total={90}
								page={1}
								pageSize={30}
							/>
						</TabPane>
						<TabPane tab="登陆记录" key="2">
							<Table
								data={[{}]}
								headerList={this.renderTable2Header()}
								total={90}
								page={1}
								pageSize={30}
							/>
						</TabPane>
						<TabPane tab="已安装记录" key="3">
							<Table
								data={[{}]}
								headerList={this.renderTable3Header()}
								total={90}
								page={1}
								pageSize={30}
							/>
						</TabPane>
						<TabPane tab="信用记录" key="4">
							<Table
								data={[{}]}
								headerList={this.renderTable4Header()}
								total={90}
								page={1}
								pageSize={30}
							/>
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}
