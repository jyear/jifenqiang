import * as React from "react";
import { Input, Select, Button, Checkbox } from "antd";
import ListPage from "../../../@mixin/listpage/";
import FooterCtrl from "../../../components/footer_ctrl/";
import TableBox from "../../../components/tablebox/";
import NoPass from "../components/nopass/";
import "./index.less";

const Option = Select.Option;
export interface Props {}
export interface State {
	name: string;
	page: number;
	pageSize: number;
	keyword: string;
	status: number;
	isLoading: boolean;
	isShowModal: boolean;
	confirmLoading: boolean;
	clickItem: any;
}
export default class Root extends ListPage<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	readonly state = {
		keyword: "",
		status: 0,
		name: "",
		page: 1,
		pageSize: 30,
		isLoading: false,
		isShowModal: false,
		confirmLoading: false,
		clickItem: {}
	};
	public componentWillMount() {
		this.setState({
			name: "张三丰"
		});
	}
	public InputChange(tag: string, e: any) {
		this.setState({
			[tag]: e.target && e.target.value ? e.target.value : e
		});
	}
	public renderHeaderLeftDom() {
		let { keyword, status } = this.state;
		return (
			<div>
				<Input
					className="input-large"
					value={keyword}
					placeholder="请输入用户ID"
					onChange={this.InputChange.bind(this, "keyword")}
				/>
				<span className="split" />
				<Select
					value={status}
					className="input"
					onChange={this.InputChange.bind(this, "status")}
				>
					<Option key="0" value={0}>
						审核中
					</Option>
					<Option key="1" value={1}>
						审核通过
					</Option>
					<Option key="2" value={2}>
						审核未通过
					</Option>
				</Select>
				<span className="split" />
				<Button type="primary">搜索</Button>
			</div>
		);
	}
	public reanderHeaderRightDom() {
		return (
			<div>
				<Button type="primary" className="btn">
					审核通过选中项
				</Button>
			</div>
		);
	}
	public applySure(item: any) {
		console.log(item);
	}
	public applyNoPass(item: any) {
		this.setState({
			clickItem: item,
			isShowModal: true
		});
	}
	public tableHeader() {
		return [
			{
				name: "ID",
				class: "td80 tc",
				key: "checkbox",
				render: (keys: any, item: any) => <Checkbox />,
				titleRender: () => (
					<span>
						<Checkbox />
						<span>全选</span>
					</span>
				)
			},
			{
				name: "操作",
				class: "tc",
				key: "ctrls",
				width: 200,
				render: (item: any) => (
					<span>
						<span
							className="ctrlbtn"
							onClick={this.applySure.bind(this, item)}
						>
							审核通过
						</span>
						<span
							className="ctrlbtn"
							onClick={this.applyNoPass.bind(this, item)}
						>
							审核不通过
						</span>
					</span>
				)
			},
			{ name: "提交时间", class: "td100 tc", key: "time" },
			{ name: "用户ID", class: "td150 tc", key: "name" },
			{ name: "信用等级", class: "td150 tc", key: "status" },
			{ name: "任务ID", class: "td150 tc", key: "status" },
			{ name: "任务名称", class: "td150 tc", key: "status" },
			{ name: "任务价格", class: "td150 tc", key: "status" },
			{ name: "不通过次数", class: "td150 tc", key: "status" },
			{ name: "上次不通过原因", class: "tc", key: "status" },
			{ name: "示例截图", class: "td150 tc", key: "status" },
			{ name: "提交截图", class: "td150 tc", key: "status" }
		];
	}
	public closeModal(): void {
		this.setState({
			isShowModal: false
		});
	}
	public submitModal(res: any): void {
		console.log(res);
	}
	public render() {
		let {
			page,
			pageSize,
			isLoading,
			isShowModal,
			confirmLoading
		} = this.state;
		let data: any[] = [
			{
				id: 1,
				name: "张三"
			},
			{
				id: 3,
				name: "张三"
			}
		];

		return (
			<div className="list-page-box">
				<div className="list-header">
					<div className="left-el">{this.renderHeaderLeftDom()}</div>
					<div className="right-el">
						{this.reanderHeaderRightDom()}
					</div>
				</div>
				<div className="list-center">
					<TableBox
						headerList={this.tableHeader()}
						data={data}
						isLoading={isLoading}
					/>
				</div>
				<div className="list-footer">
					<FooterCtrl
						pageChange={this.pageChange.bind(this)}
						total={80}
						batchValue={0}
						currentPage={Number(page)}
						pageSize={pageSize}
					/>
				</div>
				<NoPass
					closeModal={this.closeModal.bind(this)}
					visible={isShowModal}
					submitClick={this.submitModal.bind(this)}
					confirmLoading={confirmLoading}
				/>
			</div>
		);
	}
}
