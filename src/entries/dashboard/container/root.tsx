import * as React from "react";
import ListPage from "../../../@mixin/listpage/";
import FooterCtrl from "../../../components/footer_ctrl/";
import "./index.less";
export interface Props {}
export interface State {
	name: string;
	page: number;
	pageSize: number;
}
export default class Root extends ListPage<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	readonly state = {
		name: "",
		page: 1,
		pageSize: 30
	};
	componentWillMount() {
		this.setState({
			name: "张三丰"
		});
	}
	render() {
		let { page, pageSize } = this.state;
		return (
			<div className="list-page-box">
				<div className="list-header">
					<div className="left-el">2</div>
					<div className="right-el">2</div>
				</div>
				<div className="list-center">3</div>
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
