import * as React from "react";
import { Modal, Input, Checkbox } from "antd";
import "./index.less";
const TextArea = Input.TextArea;
interface Props {
	closeModal: any;
	visible: boolean;
	submitClick?: any;
	confirmLoading?: boolean;
}
interface State {
	title: string;
	isChecked: boolean;
	textValue: string;
}
export default class NoPass extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	static readonly defaultProps = {
		visible: false,
		confirmLoading: false
	};
	readonly state = {
		title: "审核不通过",
		isChecked: false,
		textValue: ""
	};
	public okClick() {
		let { submitClick } = this.props;
		if (submitClick && typeof submitClick === "function") {
			submitClick({
				textValue: this.state.textValue,
				isChecked: this.state.isChecked
			});
		}
	}
	public cancelClick() {
		let { closeModal } = this.props;
		if (closeModal && typeof closeModal === "function") {
			closeModal();
		}
	}
	public InputChange(tag: string, e: any) {
		let value;
		if (e && e.target) {
			let type = e.target.type;
			switch (type) {
				case "checkbox":
					value = e.target.checked;
					break;
				default:
					value = e.target.value;
			}
			let set: any = {
				[tag]: value
			};
			this.setState({
				...set
			});
		} else {
			let set: any = {
				[tag]: e
			};
			this.setState({
				...set
			});
		}
	}
	public render() {
		let { title, textValue, isChecked } = this.state;
		let { visible, confirmLoading } = this.props;
		return (
			<div>
				<Modal
					title={title}
					visible={visible}
					confirmLoading={false}
					onOk={this.okClick.bind(this)}
					onCancel={this.cancelClick.bind(this)}
					wrapClassName="nopass-modal"
				>
					<TextArea
						placeholder="请输入不通过原因"
						style={{ height: "2rem" }}
						value={textValue}
						onChange={this.InputChange.bind(this, "textValue")}
					/>
					<div className="check">
						<Checkbox
							checked={isChecked}
							onChange={this.InputChange.bind(this, "isChecked")}
						>
							<span>允许重新提交</span>
						</Checkbox>
					</div>
				</Modal>
			</div>
		);
	}
}
