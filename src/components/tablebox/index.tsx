import * as React from "react";
import { Spin, Icon } from "antd";
import "./index.less";
interface Props {
	headerList: any;
	data: any[];
	isLoading?: boolean;
}
export default class TableBox extends React.PureComponent<Props> {
	public render() {
		let { headerList, data, isLoading } = this.props;
		return (
			<div className="table-box">
				<div className="table-header">
					<table className="table">
						<thead>
							<tr>
								{headerList &&
									headerList.length > 0 &&
									headerList.map((item: any, index: any) => {
										return (
											<td
												key={index}
												className={item.class}
											>
												{item.name}
											</td>
										);
									})}
							</tr>
						</thead>
					</table>
				</div>
				<div className="table-body">
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
														(v: any, i: any) => {
															return (
																<td
																	key={i}
																	className={
																		v.class
																	}
																>
																	{v.render &&
																		v.render(
																			item[
																				v
																					.key
																			],
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
		);
	}
}
