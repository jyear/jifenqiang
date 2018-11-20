import * as React from "react";
import ListPage from "../../../@mixin/listpage/";
import FooterCtrl from "../../../components/footer_ctrl/";
import "./index.less";
interface Props {}
interface State {
	name: string;
	page: number;
	pageSize: number;
}
export default class Root extends ListPage<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: "",
			page: 1,
			pageSize: 30
		};
	}

	componentWillMount() {
		this.setState({
			name: "张三丰"
		});
	}
	render() {
		return (
			<div className="list-page-box">
				<div className="list-header">2</div>
				<div className="list-center">3</div>
				<div className="list-footer">
					<FooterCtrl
						pageChange={this.pageChange.bind(this)}
						total={80}
						batchValue={0}
						currentPage={Number(this.state.page)}
						pageSize={this.state.pageSize}
					/>
				</div>
			</div>
		);
	}
}
