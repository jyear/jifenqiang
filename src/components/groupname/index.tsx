import * as React from "react";

import "./index.less";
interface Props {
	title: string;
}
export default class GroupName extends React.PureComponent<Props> {
	static readonly defaultProps = {
		title: ""
	};
	render() {
		let { title } = this.props;
		return (
			<div className="group-name">
				<div className="text">{title}</div>
				<div className="line" />
			</div>
		);
	}
}
