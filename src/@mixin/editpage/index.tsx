import * as React from "react";

import "./index.less";
interface Props {}
export default class EditPage<P, S> extends React.PureComponent<Props> {
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
}
