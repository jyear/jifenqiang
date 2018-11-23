import * as React from "react";
import "./index.less";
import FooterCtrl from "../../../../components/footer_ctrl/";
import TableBox from "../../../../components/tablebox/";
interface Props {
	headerList: any[];
	data: any[];
	pageSize: number;
	page: number;
	total: number;
}
interface State {}

export default class Table extends React.PureComponent<Props, State> {
	static readonly defaultProps = {
		page: 1,
		pageSize: 30
	};
	constructor(props: Props) {
		super(props);
	}
	public pageChange() {}
	render() {
		let { headerList, data, pageSize, total, page } = this.props;
		return (
			<div>
				<TableBox
					style={{ height: "400px" }}
					headerList={headerList}
					data={data}
				/>
				<FooterCtrl
					currentPage={page}
					total={total}
					pageSize={pageSize}
					pageChange={this.pageChange.bind(this)}
				/>
			</div>
		);
	}
}
