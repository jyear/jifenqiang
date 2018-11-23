import * as React from "react";
import { Input, Select, DatePicker, Spin } from "antd";

import * as classnames from "classnames";
const Option = Select.Option;
const { TextArea } = Input;
import "./index.less";

interface Props {
	isMust?: boolean;
	labelName: string;
	type?: string;
	desc?: string;
	className?: string;
	length?: number;
	mode?: string;
	disabled?: boolean;
	onChange: any;
	onSearch?: any;
	value: any;
	optionArr?: any;
	showTime?: boolean;
	flexTop?: boolean;
	format?: string;
	filterOption?: boolean;
	isFetch?: boolean;
	children?: any;
}

export default class InputBox extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}
	static readonly defaultProps = {
		isMust: false,
		labelName: "",
		type: "text",
		showTime: false,
		flexTop: false,
		disabled: false,
		format: "YYYY-MM-DD",
		filterOption: false,
		isFetch: false,
		className: ""
	};
	formatValue(value: []) {
		if (!value || value.length <= 0) {
			return value;
		}
		let a = value.map(item => {
			return Number(item);
		});
		return a;
	}
	inputChange(e: any) {
		let { type, onChange } = this.props;
		if (onChange && typeof onChange === "function") {
			let value = "";
			switch (type) {
				case "select":
					value = e;
					break;
				case "datepicker":
					value = e;
					break;
				default:
					value = e.target.value;
			}
			onChange(value);
		}
	}
	selectSearch(value: any) {
		if (this.props.onSearch && typeof this.props.onSearch === "function") {
			this.props.onSearch(value);
		}
	}
	render() {
		let {
			isMust,
			labelName,
			type,
			value,
			className,
			optionArr,
			length,
			mode,
			showTime,
			flexTop,
			disabled,
			format,
			filterOption,
			isFetch,
			desc,
			children
		} = this.props;
		return (
			<div className={classnames("inputbox-container", className)}>
				<div
					className={classnames(
						"input-item",
						flexTop || (desc && desc.length > 0) ? "at" : ""
					)}
				>
					<div className="label-name">
						<span className="text">
							{labelName}
							<span />
						</span>
						<i className="must">{isMust && "*"}</i>
						<span>:</span>
					</div>
					<div className="label-input">
						{children}
						{!children && (
							<div>
								{(type === "text" ||
									type === "number" ||
									type === "tel" ||
									type === "password") && (
									<Input
										disabled={disabled}
										type={type}
										value={value}
										maxLength={length}
										onChange={this.inputChange.bind(this)}
									/>
								)}
								{type === "select" && !mode && (
									<Select
										disabled={disabled}
										value={Number(value)}
										onChange={this.inputChange.bind(this)}
										style={{ width: "100%" }}
									>
										{optionArr &&
											optionArr instanceof Array &&
											optionArr.length > 0 &&
											optionArr.map(
												(item: any, index: any) => {
													return (
														<Option
															key={index}
															value={Number(
																item.value
															)}
														>
															{item.label}
														</Option>
													);
												}
											)}
									</Select>
								)}
								{type === "select" && mode && (
									<Select
										disabled={disabled}
										value={this.formatValue(value)}
										onChange={this.inputChange.bind(this)}
										filterOption={filterOption}
										style={{ width: "100%" }}
										mode={mode}
										notFoundContent={
											isFetch ? (
												<div
													style={{
														textAlign: "center"
													}}
												>
													<Spin size="small" />
													<span
														style={{
															fontSize: "12px",
															marginLeft: "10px"
														}}
													>
														正在搜索数据...
													</span>
												</div>
											) : (
												<div
													style={{
														textAlign: "center",
														fontSize: 12
													}}
												>
													暂无数据
												</div>
											)
										}
										onSearch={this.selectSearch.bind(this)}
									>
										{optionArr &&
											optionArr instanceof Array &&
											optionArr.length > 0 &&
											optionArr.map(
												(item: any, index: any) => {
													return (
														<Option
															key={index}
															value={Number(
																item.key
															)}
														>
															{item.label}
														</Option>
													);
												}
											)}
									</Select>
								)}
								{type === "datepicker" && (
									<DatePicker
										format={format}
										disabled={disabled}
										style={{ width: "100%" }}
										value={value}
										showTime={showTime}
										onChange={this.inputChange.bind(this)}
									/>
								)}
								{type === "textarea" && (
									<TextArea
										style={{ width: "100%" }}
										value={value}
										autosize={{ minRows: 4 }}
										onChange={this.inputChange.bind(this)}
									/>
								)}
							</div>
						)}
						{this.props.desc && this.props.desc.length > 0 && (
							<div
								style={{
									color: "#a4a4a4",
									textAlign: "left",
									marginTop: "0.02rem",
									paddingLeft: ".1rem",
									position: "relative",
									top: ".1rem"
								}}
							>
								{this.props.desc}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
