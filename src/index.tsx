import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import createHistory from "history/createHashHistory";
import { HashRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import storeFun from "./store";
import Routes from "./routes";
import "./assets/css/base.less";
import "./assets/css/common.less";
import "antd/dist/antd.css";
let store: any = storeFun();
let appHistory: any = createHistory();
window.appHistory = appHistory;
const render = (Component: any) => {
	ReactDom.render(
		<LocaleProvider locale={zh_CN}>
			<Provider store={store}>
				<Router>
					<Component />
				</Router>
			</Provider>
		</LocaleProvider>,
		document.getElementById("root")
	);
};
render(Routes);
registerServiceWorker();
