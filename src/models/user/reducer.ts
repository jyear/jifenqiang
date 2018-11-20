import { LOGININ, CHANGE_PASSWORD } from "./types";
import { handleActions } from "redux-actions";
const defaultState: any = null;
export const user: any = handleActions(
	{
		[LOGININ]: (state, { payload }) => {
			return { ...state, ...payload };
		}
	},
	defaultState
);
export const changePass = handleActions(
	{
		[CHANGE_PASSWORD]: (state, { payload }) => {
			return { ...state, ...payload };
		}
	},
	defaultState
);
