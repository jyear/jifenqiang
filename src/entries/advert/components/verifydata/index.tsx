import * as React from "react";
import { Modal, DatePicker, Button } from "antd";
import classnames from "classnames";
import FooterCtrl from "../../../../components/footer_ctrl/";
import TableBox from "../../../../components/tablebox/";
import * as moment from "moment";
import "./index.less";
interface Props {
	domList: any[];
	close?: any;
	visible: boolean;
}
interface State {
	key: number;
	w: any;
	startDate: any;
	endDate: any;
}
const dateFormat = "YYYY-MM-DD";
export default class VerifyData extends React.PureComponent<Props, State> {
	readonly state = {
		key: 0,
		w: {
			width: "100%"
		},
		startDate: moment().subtract(1, "month"),
		endDate: moment()
	};
	static readonly defaultProps = {
		visible: false
	};

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
	cancelClick() {
		let { close } = this.props;
		if (close && typeof close === "function") {
			close();
		}
	}
	render() {
		let { domList, visible } = this.props;
		let { key, w, startDate, endDate } = this.state;

		return (
			<Modal
				visible={visible}
				centered={true}
				wrapClassName="verifydata-box"
				bodyStyle={{ padding: "0 " }}
				onCancel={this.cancelClick.bind(this)}
				title={
					<div
						style={{
							display: "flex",
							alignItems: "center"
						}}
					>
						{domList &&
							domList.length > 0 &&
							domList.map((item, index) => {
								return (
									<span
										className={classnames(
											"title",
											key == index ? "cur" : ""
										)}
										key={index}
										onClick={this.titleClick.bind(
											this,
											index
										)}
									>
										{item.name}
									</span>
								);
							})}
						<DatePicker
							value={startDate}
							style={{ marginLeft: ".3rem" }}
						/>
						<span
							style={{
								fontSize: ".12rem",
								color: "#a4a4a4",
								margin: "0 .05rem"
							}}
						>
							至
						</span>
						<DatePicker value={endDate} />
						<Button style={{ marginLeft: ".1rem" }} type="primary">
							查看
						</Button>
					</div>
				}
				width="80%"
				footer={null}
			>
				<div className="verifydata-container" ref="verifydataContainer">
					<div className="container-box" style={this.transformCard()}>
						{domList &&
							domList.length > 0 &&
							domList.map((item, index) => {
								return (
									<div
										className="tab-card"
										key={index}
										style={w}
									>
										<TableBox
											className="verifydata-tabel"
											data={[]}
											headerList={item.list}
										/>
										<FooterCtrl
											className="verifydata-footer"
											pageChange={this.pageChange.bind(
												this
											)}
											total={80}
											batchValue={0}
											currentPage={Number(1)}
											pageSize={20}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</Modal>
		);
	}
}
