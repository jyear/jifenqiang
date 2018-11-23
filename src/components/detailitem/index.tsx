import * as React from "react";
import classnames from "classnames";
import "./index.less";
interface Props {
	className?: string;
	style?: any;
	labelName: string;
	content: string;
}

export default class DetailItem extends React.PureComponent<Props> {
	static readonly defaultProps = {
		className: "",
		labelName: "",
		content: "",
		style: {}
	};
	private detailItem: React.RefObject<HTMLInputElement>;
	constructor(props: Props) {
		super(props);
		this.detailItem = React.createRef();
	}
	public componentDidMount() {
		this.countWidth();
	}
	public countWidth() {
		let item: HTMLElement = this.detailItem.current;
		let w: number = item.clientWidth;
		let s: number = w / 300;
		let n: number = parseInt(Math.ceil(s).toString()) * 300;
		item.style.width = n + "px";
	}
	render() {
		let { className, labelName, content, style } = this.props;
		return (
			<div
				className={classnames("detail-item", className)}
				style={style}
				ref={this.detailItem}
			>
				<span className="detail-item-name">{labelName}</span>
				<span className="detail-item-text">
					{content && content.length > 0 ? content : "--"}
				</span>
			</div>
		);
	}
}
