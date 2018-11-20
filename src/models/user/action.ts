import { createAction } from "redux-actions";
import http from "../../utils/ajax";
import { LOGININ, CHANGE_PASSWORD } from "./types";

export const loginIn = createAction(LOGININ, (params: any) => {
	return http.post({
		url: "auth/login",
		params: params
	});
});
export const changePassword = createAction(CHANGE_PASSWORD, (params: any) => {
	return http.post({
		url: "auth/change",
		params
	});
});
