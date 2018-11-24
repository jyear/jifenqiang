import * as React from "react";
import { Modal } from "antd";
import classnames from "classnames";
import FooterCtrl from "../../../../components/footer_ctrl/";
import TableBox from "../../../../components/tablebox/";
import "./index.less";

interface Props {
	titleList: string[];
}
interface State {
	key: number;
}
export default class VerifyData extends React.PureComponent<Props, State> {
	readonly state = {
		key: 0
	};
	static readonly defaultProps = {};
	titleClick(key: number) {
		this.setState({
			key: key
		});
	}
	pageChange() {}
	transformCard() {
		return {
			transform: `translateX(-${this.state.key * 100}%)`
		};
	}
	renderHeader1(): any[] {
		return [
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
		];
	}
	renderHeader2(): any[] {
		return [
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
		];
	}
	render() {
		let { titleList } = this.props;
		let { key } = this.state;
		return (
			<Modal
				visible={true}
				centered={true}
				wrapClassName="verifydata-box"
				bodyStyle={{ padding: "0 " }}
				title={
					titleList &&
					titleList.length > 0 &&
					titleList.map((item, index) => {
						return (
							<span
								className={classnames(
									"title",
									key == index ? "cur" : ""
								)}
								key={index}
								onClick={this.titleClick.bind(this, index)}
							>
								{item}
							</span>
						);
					})
				}
				width="80%"
				footer={null}
			>
				<div className="verifydata-container">
					<div className="container-box" style={this.transformCard()}>
						<div className="tab-card">
							<TableBox
								className="verifydata-tabel"
								data={[]}
								headerList={this.renderHeader1()}
							/>
							<FooterCtrl
								pageChange={this.pageChange.bind(this)}
								total={80}
								batchValue={0}
								currentPage={Number(1)}
								pageSize={20}
							/>
						</div>
						<div className="tab-card">
							<TableBox
								className="verifydata-tabel"
								data={[]}
								headerList={this.renderHeader2()}
							/>
							<FooterCtrl
								pageChange={this.pageChange.bind(this)}
								total={80}
								batchValue={0}
								currentPage={Number(1)}
								pageSize={20}
							/>
						</div>
						<div className="tab-card">
							<TableBox
								className="verifydata-tabel"
								data={[]}
								headerList={this.renderHeader1()}
							/>
							<FooterCtrl
								pageChange={this.pageChange.bind(this)}
								total={80}
								batchValue={0}
								currentPage={Number(1)}
								pageSize={20}
							/>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
