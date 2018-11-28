import * as React from "react";
import { Input, Select, Button, Modal, Tabs } from "antd";
import ListPage from "../../../@mixin/listpage/";
import FooterCtrl from "../../../components/footer_ctrl/";
import TableBox from "../../../components/tablebox/";
import VerifyData from "../components/verifydata/";
import "./index.less";

const Option = Select.Option;
const TextArea = Input.TextArea;
export interface Props {}
export interface State {
	name: string;
	page: number;
	pageSize: number;
	keyword: string;
	status: number;
	isLoading: boolean;
	currentItem: any;
	isShowDownModal: boolean;
	downText: string;
	isShowVerifyDataModal: boolean;
}
export default class Root extends ListPage<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	readonly state: State = {
		keyword: "",
		status: 0,
		name: "",
		page: 1,
		pageSize: 30,
		isLoading: false,
		isShowDownModal: false,
		downText: "",
		currentItem: null,
		isShowVerifyDataModal: true
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
					placeholder="请输入广告或广告主名称"
					onChange={this.InputChange.bind(this, "keyword")}
				/>
				<span className="split" />
				<Select
					value={status}
					className="input"
					onChange={this.InputChange.bind(this, "status")}
				>
					<Option key="0" value={0}>
						全部
					</Option>
					<Option key="1" value={1}>
						上架
					</Option>
					<Option key="2" value={2}>
						下架
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
					添加Android广告
				</Button>
				<Button type="primary" className="btn">
					添加ios广告
				</Button>
			</div>
		);
	}
	//下架点击
	public downClick(item: any) {
		this.setState({
			isShowDownModal: true,
			currentItem: item
		});
	}
	//下架确认
	downSureClick() {}
	//关闭下架弹出框
	closeDownModal() {
		this.setState({
			isShowDownModal: false
		});
	}
	public tableHeader() {
		return [
			{ name: "广告ID", class: "td80 tc", key: "id" },
			{ name: "Logo", class: "td80 tc", key: "logo" },
			{ name: "广告名称", class: "td150 tc", key: "name" },
			{ name: "投放平台", class: "td150 tc", key: "platform" },
			{ name: "广告类型", class: "td150 tc", key: "type" },
			{ name: "今日限量", class: "td150 tc", key: "todaynum" },
			{ name: "今日完成", class: "td120 tc", key: "todayend" },
			{ name: "完成率", class: "td150 tc", key: "endprent" },
			{ name: "状态", class: "td150 tc", key: "status" },
			{
				name: "操作",
				class: "tc",
				key: "ctrls",
				width: 350,
				render: (ctrls: any, item: any) => (
					<span>
						<span className="ctrlbtn">编辑</span>
						<span className="ctrlbtn">计数任务列表</span>
						<span className="ctrlbtn">深度任务列表</span>
						<span
							className="ctrlbtn"
							onClick={this.openVerifyDataModal.bind(this, item)}
						>
							数据核对
						</span>
						<span
							className="ctrlbtn"
							onClick={this.downClick.bind(this, item)}
						>
							下架
						</span>
					</span>
				)
			}
		];
	}
	vilidDataDomList() {
		return [
			{
				name: "数据核对",
				key: 0,
				list: [
					{
						name: "日期",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "开始人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "激活人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "计数人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "结算个数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "转化率",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "结算单价",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "实际单价",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "成本",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "收入",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "利润",
						key: "date",
						width: 150,
						class: "tc"
					}
				]
			},
			{
				name: "计数数据",
				key: 1,
				list: [
					{
						name: "日期",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "申请人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "申请人次",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "开始人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "开始人次",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "提交人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "提交人次",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "计数人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "返奖成功人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "完成率/人数",
						key: "date",
						width: 150,
						class: "tc"
					},
					{
						name: "完成率/人次",
						key: "date",
						width: 150,
						class: "tc"
					}
				]
			},
			{
				name: "深度数据",
				key: 3,
				list: [
					{
						name: "完成率/人次",
						key: "date",
						width: 150,
						class: "tc"
					}
				]
			}
		];
	}
	closeVerifyDataModal() {
		this.setState({
			isShowVerifyDataModal: false
		});
	}
	openVerifyDataModal(item: any) {
		this.setState({
			isShowVerifyDataModal: true,
			currentItem: item
		});
	}
	public render() {
		let {
			page,
			pageSize,
			isLoading,
			isShowDownModal,
			downText,
			isShowVerifyDataModal
		} = this.state;
		let data: any[] = [
			{
				id: 1,
				name: "张三"
			},
			{
				id: 1,
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
				<Modal
					title="下架原因"
					visible={isShowDownModal}
					onOk={this.downSureClick.bind(this)}
					onCancel={this.closeDownModal.bind(this)}
				>
					<TextArea
						value={downText}
						onChange={this.InputChange.bind(this, "downText")}
						style={{ height: "2rem" }}
					/>
				</Modal>
				<VerifyData
					visible={isShowVerifyDataModal}
					close={this.closeVerifyDataModal.bind(this)}
					domList={this.vilidDataDomList()}
				/>
			</div>
		);
	}
}
