import * as React from "react";
import { Button, Radio } from "antd";
import "./index.less";
import EditPage from "../../../@mixin/editpage/";
import DetailHeader from "../../../components/detail_header/";
import TableBox from "../../../components/tablebox/";
interface Props {}
interface State {
	status: number;
}
export default class Root extends EditPage<Props, State> {
	constructor(props: any) {
		super(props);
	}
	readonly state: State = {
		status: 0
	};
	goHome() {
		window.appHistory.push("/");
	}
	renderHeaderList() {
		return [
			{
				name: "序号",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "任务ID",
				width: 150,
				key: "number"
			},
			{
				name: "任务名称",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "检测方式",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "每日限量",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "关键词",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "任务价格",
				width: 120,
				class: "tc",
				key: "number"
			},
			{
				name: "投放周期",
				class: "tc",
				key: "number"
			},
			{
				name: "投放时段",
				width: 200,
				class: "tc",
				key: "number"
			},
			{
				name: "状态",
				width: 100,
				class: "tc",
				key: "number"
			},
			{
				name: "操作",
				width: 160,
				class: "tc",
				key: "number"
			}
		];
	}
	render() {
		let { status } = this.state;
		return (
			<div className="edit-page taskbox">
				<DetailHeader title="计数任务" />
				<div className="radiobox">
					<Radio.Group
						value={status}
						onChange={this.InputChange.bind(this, "status")}
						style={{ marginBottom: 16 }}
					>
						<Radio.Button value={0}>所有</Radio.Button>
						<Radio.Button value={1}>启用</Radio.Button>
						<Radio.Button value={2}>禁用</Radio.Button>
					</Radio.Group>
				</div>
				<div className="task-table">
					<div className="task-table-box">
						<TableBox
							isFullPage={false}
							data={[]}
							headerList={this.renderHeaderList()}
						/>
					</div>
				</div>
				<div className="addmore">
					<div>添加更多计数任务</div>
					<div className="addmore-btn">
						<span className="btn">添加(计时)计数任务</span>
						<span className="btn">添加(计数)计数任务</span>
					</div>
				</div>
			</div>
		);
	}
}
