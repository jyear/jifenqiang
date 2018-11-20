import React, { PureComponent } from "react";
import { Pagination, Checkbox, Select, Button } from "antd";
import PropTypes from "prop-types";
const Option = Select.Option;
import "./index.less";
interface Props {
	currentPage: number;
	pageSize: number;
	total: number;
	batch?: any;
	isCheckAll?: boolean;
	batchSure?: any;
	batchValue?: number;
	pageChange: any;
	checkBoxChange?: any;
}
interface State {
	batch: any;
	batchValue: number;
}
export default class FooterCtrl extends PureComponent<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			batch: props.batch ? props.batch : [],
			batchValue: props.batchValue
				? props.batchValue
				: props.batch && props.batch.length > 0
				? props.batch[0].value
				: 0
		};
	}

	pageChange(e: any): void {
		let { pageChange } = this.props;
		if (pageChange && typeof pageChange === "function") {
			this.props.pageChange(e);
		}
	}
	batchChange(e: any): void {
		this.setState({
			batchValue: e
		});
	}
	checkAllBoxChange(e: any): void {
		if (
			this.props.checkBoxChange &&
			typeof this.props.checkBoxChange === "function"
		) {
			this.props.checkBoxChange(e);
		}
	}
	batchSureClick(): void {
		let { batchSure } = this.props;
		if (batchSure && typeof batchSure === "function") {
			batchSure({ value: this.state.batchValue });
		}
	}
	render() {
		let {
			currentPage = 1,
			pageSize = 20,
			total,
			isCheckAll = false
		} = this.props;
		let { batch, batchValue } = this.state;
		return (
			<div className="footerctrl">
				<div className="left">
					{batch && batch.length > 0 && (
						<span>
							<Checkbox
								checked={isCheckAll}
								onChange={this.checkAllBoxChange.bind(this)}
							/>
							<span>全选</span>
							<Select
								onChange={this.batchChange.bind(this)}
								value={batchValue}
								style={{ width: "1rem" }}
							>
								{batch.map((item: any, index: any) => {
									return (
										<Option key={index} value={item.value}>
											{item.label}
										</Option>
									);
								})}
							</Select>
							<Button
								onClick={this.batchSureClick.bind(this)}
								style={{ marginLeft: ".1rem" }}
								type="primary"
							>
								确定
							</Button>
						</span>
					)}
				</div>
				<Pagination
					showTotal={(total, range) => {
						return `共${Math.ceil(
							total / pageSize
						)}页/${total}条数据`;
					}}
					current={currentPage}
					pageSize={pageSize}
					total={total}
					onChange={this.pageChange.bind(this)}
					showQuickJumper={true}
				/>
			</div>
		);
	}
}
