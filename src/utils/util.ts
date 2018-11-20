import * as CryptoJS from "crypto-js";
window.CryptoJS = CryptoJS;
//获取页面search
export const getQuery = function(location: string) {
	var search = location.split("?")[1];
	var query: any = {};
	if (search && search.length > 0) {
		var list = search.split("&");
		for (let i = 0; i < list.length; i++) {
			var q = list[i].split("=");
			query[q[0]] = q[1];
		}
	}
	return query;
};
//单选redux
export const singleCheckReducer = (state: any, { payload }: any) => {
	let list = state.lists;
	if (list && list.length > 0) {
		list.map((item: any) => {
			if (item._id == payload.id) {
				item.isChecked = !item.isChecked;
			}
		});
	}
	return { ...state, lists: [...list] };
};
//全选redux
export const allCheckReducer = (state: any, { payload }: any) => {
	let list = state.lists;
	if (list && list.length > 0) {
		list.map((item: any) => {
			item.isChecked = payload.state;
		});
	}
	return { ...state, lists: [...list] };
};
//首字母大写
export const firstWordUpcase = function(word: string) {
	if (!word || typeof word !== "string") {
		throw new Error("word is not a string ");
	}
	return word.substring(0, 1).toUpperCase() + word.substring(1);
};
window.firstWordUpcase = firstWordUpcase;
//验证手机号
export const vilidPhone = function(n: string) {
	var reg = /^1(3[1-9]|5[1-9]|7[1-9]|8[1-9])[0-9]{8}$/;
	return reg.test(n);
};
//验证固定电话
export const vilidTel = function(n: string) {
	var reg = /^0\d{2,3}-?\d{7,8}$/;
	return reg.test(n);
};
var key = CryptoJS.enc.Utf8.parse("0102030405060708");
var iv = "0102030405060708";
//加密
export const encryptPass = function(value: string) {
	if (!value) {
		throw new Error("需要加密数据不能为空");
	}
	let data: any = {};
	data.iv = window.Base64.encode(iv);
	data.value = CryptoJS.AES.encrypt(value, key, {
		iv: CryptoJS.enc.Utf8.parse(iv),
		mode: CryptoJS.mode.CBC
	}).toString();
	return window.Base64.encode(JSON.stringify(data));
};
//解密
export const decryptPass = function(ctrptText: string) {
	if (!ctrptText) {
		throw new Error("密文不能为空");
	}
	let s = window.Base64.decode(ctrptText);
	try {
		let j = JSON.parse(s);
		let va = j.value;
		let vi = window.Base64.decode(j.iv);
		return CryptoJS.AES.decrypt(va, key, {
			iv: CryptoJS.enc.Utf8.parse(vi),
			mode: CryptoJS.mode.CBC
		}).toString(CryptoJS.enc.Utf8);
	} catch (e) {
		throw new Error(e);
	}
};
//验证邮箱
export const vilidEmail = function(n: string) {
	var reg = /.*?\@.*?\.(com|cn|cc|io|org|net|xyz)$/;
	return reg.test(n);
};
export const vilidString = function(s: string) {
	var reg = /(\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\||\"||[\u4e00-\u9fa5]|\?|\\|\>|\<|\,|\.|\'|\:|\;)/;
	return reg.test(s);
};
//下载
export const downFile = function(params: any, u: string) {
	let url: string = "excel/expload";
	if (u) {
		url = u;
	}

	let userInfo: any = localStorage.getItem("userInfo");
	userInfo = JSON.parse(userInfo);
	let query = "";
	if (params) {
		let keys = Object.keys(params);
		let pa: string[] = [];
		if (keys && keys.length > 0) {
			keys.map(item => {
				if (params[item] != null) {
					pa.push(`${item}=${params[item]}`);
				}
			});
			if (pa.length > 0) {
				query = `&${pa.join("&")}`;
			}
		}
	}
	if (userInfo && userInfo.token) {
		window.open(
			window.requestUrl + url + "?token=" + userInfo.token + query
		);
	}
};
