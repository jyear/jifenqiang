import * as React from "react";
import { Icon } from "antd";
import classnames from "classnames";
import "./index.less";

interface Props {
	title: string;
	hasReturn?: boolean;
	rightEl?: any;
	className?: string;
}

export default class DetailHeader extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}
	static readonly defaultProps = {
		title: "",
		hasReturn: true
	};
	public goBackClick(): void {
		window.appHistory.goBack();
	}
	public render() {
		let { title, hasReturn, rightEl, className } = this.props;
		return (
			<div className={classnames("detail-header", className)}>
				{hasReturn && (
					<div
						className="detail-header-leftel"
						onClick={this.goBackClick.bind(this)}
					>
						<Icon type="left" style={{ fontSize: ".2rem" }} />
						返回
					</div>
				)}

				<span className="detail-header-title">{title}</span>
				{rightEl && (
					<div className="detail-header-rightel">{rightEl}</div>
				)}
			</div>
		);
	}
}
