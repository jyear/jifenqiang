import * as React from "react";
import { Input, Select, Button } from "antd";
import ListPage from "../../../@mixin/listpage/";
import FooterCtrl from "../../../components/footer_ctrl/";
import TableBox from "../../../components/tablebox/";
import "./index.less";
import Item from "antd/lib/list/Item";
const Option = Select.Option;
export interface Props {}
export interface State {
	name: string;
	page: number;
	pageSize: number;
	keyword: string;
	status: number;
	isLoading: boolean;
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
		isLoading: false
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
					placeholder="请输入广告主名称"
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
						启用
					</Option>
					<Option key="2" value={2}>
						禁用
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
					新建
				</Button>
			</div>
		);
	}
	public tableHeader() {
		return [
			{ name: "ID", class: "td80 tc", key: "id" },
			{ name: "公司名称", class: "tc", key: "name" },
			{ name: "状态", class: "td150 tc", key: "status" },
			{
				name: "操作",
				class: "td150 tc",
				key: "ctrls",
				render: (ctrls: any, item: any) => (
					<span>
						{ctrls &&
							ctrls.length > 0 &&
							ctrls.map((v: any, i: any) => {
								return (
									<span
										onClick={v.method.bind(this, item)}
										key={i}
										className="ctrlbtn"
									>
										{v.text}
									</span>
								);
							})}
					</span>
				)
			}
		];
	}

	public render() {
		let { page, pageSize, isLoading } = this.state;
		let data: any[] = [
			{
				id: 1,
				name: "张三",
				ctrls: [
					{
						text: "删除",
						method: function(item: any) {
							console.log(item);
						}
					},
					{
						text: "清除",
						method: function(item: any) {
							console.log(item);
						}
					}
				]
			},
			{
				id: 1,
				name: "张三",
				ctrls: [
					{
						text: "删除",
						method: function(item: any) {
							console.log(item);
						}
					},
					{
						text: "清除",
						method: function(item: any) {
							console.log(item);
						}
					}
				]
			}
		];
		data = [];
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
			</div>
		);
	}
}
