import "whatwg-fetch";
import { requestUrl } from "../config/";
import { Modal } from "antd";

const METHODS = ["get", "delete"];
const BODY_METHODS = ["post", "put", "patch"];
function parseJSON(response: any) {
	return response.json();
}
function checkStatus(response: any) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.status);
}
function checkCode(response: any) {
	if (response.code == 401) {
		window.appHistory.push({
			pathname: "/"
		});
		return;
	}
	if (response.code != 200) {
		Modal.error({
			title: "Error",
			content:
				typeof response.data === "string"
					? response.data
					: JSON.stringify(response.data)
		});
		return;
	}

	return response;
}
function request(
	method: string,
	url: string,
	params: any = {},
	header: any = {},
	outError: boolean = false
) {
	let user = localStorage.getItem("userInfo");
	let Token;
	if (user && url.indexOf("auth/login") == -1) {
		let userJson: any = JSON.parse(user);
		Token = userJson.token;
		header["api-token"] = Token;
	}

	const headers = {
		"Content-Type": "application/json",
		...header
	};
	let _url = requestUrl() + url;
	let body: any;

	if (METHODS.indexOf(method) != -1) {
		const _params = [];
		for (let key in params) {
			_params.push(`${key}=${params[key]}`);
		}
		//_params.push(`random=${Math.floor(Math.random() * 100000000)}`);
		if (_params.length) {
			_url += "?";
			_url += _params.join("&");
		}
	} else {
		body = JSON.stringify(params);
	}
	//处理超时
	var _fetch = function(url: string, options: any) {
		var timeout_promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("timeout");
			}, 20000);
		});
		let res = Promise.race([
			fetch(_url, {
				method,
				body,
				headers
			}),
			timeout_promise
		]);
		return res;
	};
	var _fetchData = _fetch(_url, {
		method,
		body,
		headers
	});
	return _fetchData
		.then(checkStatus)
		.then(res => {
			if (headers["Content-Type"] == "application/json") {
				return res.json();
			} else {
				return res.text();
			}
		})
		.then(checkCode)
		.catch((e: any) => {
			if (!outError) {
				Modal.error({
					title: "错误",
					content: `数据请求错误${e}`
				});
			} else {
				throw new Error(e.toString().replace("Error:", ""));
			}
		});
}
const methods: any = {};

interface Params {
	url: string;
	params: any;
	header: any;
}
let methodArr: any = [...METHODS, ...BODY_METHODS];

methodArr.forEach((method: string) => {
	methods[method] = ({ url, params, header }: Params, outError: boolean) =>
		request(method, url, params, header, outError);
});

export default methods;
