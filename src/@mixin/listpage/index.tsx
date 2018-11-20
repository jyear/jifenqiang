import * as React from "react";
import "./index.less";
const { PureComponent } = React;

interface Props {}
export default class ListPage<T, S> extends PureComponent<Props> {
	constructor(props: any) {
		super(props);
	}
	pageChange() {}
}
