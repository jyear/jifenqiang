import * as React from "react";
import * as ReactDom from "react-dom";
import { Icon } from "antd";
import classnames from "classnames";
import "./index.less";
interface Props {
	headerList: any;
	data: any[];
	isLoading?: boolean;
	style?: any;
	className?: string;
	isFullPage?: boolean;
}
export default class TableBox extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}
	static readonly defaultProps = {
		isLoading: false,
		isFullPage: true
	};
	public componentDidMount() {
		this.reckonWidth();
	}
	public reckonWidth() {
		let { headerList } = this.props;
		let box = ReactDom.findDOMNode(this.refs.tableBox) as HTMLElement; //document.querySelector("#tableBox");
		let tableW = box.clientWidth;
		let tw: number = 0;
		headerList.map((item: any) => {
			if (item.width) {
				tw = tw + item.width;
			} else {
				let w: number = 150;
				if (item.class && item.class.length > 0) {
					let cls = item.class.split(" ");
					cls.map((item: any) => {
						let reg = /^td\d{1,3}$/;
						if (reg.test(item)) {
							w = Number(item.replace("td", ""));
						}
					});
				}
				tw = tw + w;
			}
		});
		if (tw > tableW) {
			box.style.width = tw + "px";
		}
	}
	public renderProps(item: any): any {
		var res: any = {};
		if (item.width) {
			res.style = { width: item.width + "px" };
		}
		return res;
	}
	public render() {
		let {
			headerList,
			data,
			isLoading,
			style,
			className,
			isFullPage
		} = this.props;
		return (
			<div
				className={classnames("table-container", className)}
				style={style}
			>
				<div className="table-box" id="tableBox" ref="tableBox">
					<div className="table-header">
						<table className="table">
							<thead>
								<tr>
									{headerList &&
										headerList.length > 0 &&
										headerList.map(
											(item: any, index: any) => {
												if (item.titleRender) {
													return (
														<td
															key={index}
															className={
																item.class
															}
															{...this.renderProps(
																item
															)}
														>
															{item.titleRender()}
														</td>
													);
												} else {
													return (
														<td
															key={index}
															className={
																item.class
															}
															{...this.renderProps(
																item
															)}
														>
															{item.name}
														</td>
													);
												}
											}
										)}
								</tr>
							</thead>
						</table>
					</div>
					<div
						className={classnames(
							"table-body",
							isFullPage ? "" : "notfull"
						)}
					>
						{isLoading && (
							<div className="loadingbox">
								<Icon
									type="loading-3-quarters"
									style={{ fontSize: ".3rem" }}
									spin
								/>
								<div className="loading-text">加载中...</div>
							</div>
						)}
						{!isLoading &&
							data &&
							data.length > 0 &&
							data instanceof Array && (
								<table className="table">
									<tbody>
										{data.map((item: any, index: any) => {
											return (
												<tr
													key={index}
													className={(index => {
														return index % 2 == 0
															? "odd"
															: "";
													})(index)}
												>
													{headerList &&
														headerList.length > 0 &&
														headerList.map(
															(
																v: any,
																i: any
															) => {
																return (
																	<td
																		key={i}
																		className={
																			v.class
																		}
																		{...this.renderProps(
																			v
																		)}
																	>
																		{v.render &&
																			v.render(
																				item
																			)}
																		{!v.render &&
																			item[
																				v
																					.key
																			]}
																	</td>
																);
															}
														)}
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						{!isLoading &&
							(!data ||
								data.length <= 0 ||
								!(data instanceof Array)) && (
								<div className="nodata">
									<Icon
										type="frown"
										style={{
											fontSize: ".4rem",
											color: "#a4a4a4"
										}}
									/>
									<div className="nodata-text">暂无数据</div>
								</div>
							)}
					</div>
				</div>
			</div>
		);
	}
}
