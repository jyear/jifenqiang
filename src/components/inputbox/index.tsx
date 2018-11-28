import * as React from "react";
import {
	Input,
	Select,
	DatePicker,
	Spin,
	Upload,
	Icon,
	notification
} from "antd";

import * as classnames from "classnames";

const Option = Select.Option;
const { TextArea } = Input;
import "./index.less";

interface Props {
	isMust?: boolean;
	labelName?: string;
	type?: string;
	desc?: string;
	className?: string;
	length?: number;
	mode?: string;
	disabled?: boolean;
	onChange?: any;
	onSearch?: any;
	value?: any;
	optionArr?: OptionArr1 | OptionArr2 | any;
	showTime?: boolean;
	flexTop?: boolean;
	format?: string;
	filterOption?: boolean;
	isFetch?: boolean;
	children?: any;
	showSearch?: boolean;
	listType?: UploadListType;
	limitSize?: number;
	limitType?: any[];
	folder?: string;
	domain?: string;
	limitInfo?: LimitInfo;
	multiple?: boolean;
	placeholder?: string;
}
export declare type UploadListType = "text" | "picture" | "picture-card";
export declare type InfoType = "equa" | "greater" | "less";
interface LimitInfo {
	width: number;
	height: number;
	type: InfoType;
}
interface OptionArr1 {
	value: number;
	label: string;
}
interface OptionArr2 {
	key: number;
	label: string;
}
interface State {
	fileList: null | any;
	uploadData: any;
}
export default class InputBox extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	static readonly defaultProps: Props = {
		isMust: false,
		labelName: "",
		type: "text",
		showTime: false,
		flexTop: false,
		disabled: false,
		format: "YYYY-MM-DD",
		filterOption: false,
		isFetch: false,
		className: "",
		showSearch: false,
		listType: "picture-card",
		length: 1000000,
		limitSize: 1024 * 1024 * 10,
		limitType: [],
		folder: "default/",
		domain: "http://sdkads.oss-cn-hangzhou.aliyuncs.com",
		multiple: false
	};
	readonly state: State = {
		fileList: [],
		uploadData: {
			key: "",
			OSSAccessKeyId: "",
			policy: "",
			success_action_status: "200",
			Signature: ""
		}
	};
	public componentWillMount() {
		if (this.props.type == "uploader-img") {
			this.getAliyunData();
		}
	}
	public formatValue(value: []) {
		if (!value || value.length <= 0) {
			return value;
		}
		let a = value.map(item => {
			return Number(item);
		});
		return a;
	}
	public getAliyunData() {}
	public inputChange(e: any) {
		let { type, onChange } = this.props;
		if (onChange && typeof onChange === "function") {
			let value = "";
			switch (type) {
				case "select":
					value = e;
					break;
				case "datepicker":
					value = e;
					break;
				case "uploader":
					value = this.state.fileList.map((item: any) => {
						let set: any = {
							url: item.serverUrl,
							size: item.size,
							name: item.filename
						};
						if (item.width) {
							set.width = item.width;
						}
						if (item.height) {
							set.height = item.height;
						}
						return set;
					});
					break;
				case "uploader-img":
					value = this.state.fileList.map((item: any) => {
						let set: any = {
							url: item.serverUrl,
							size: item.size,
							name: item.filename,
							width: item.width,
							height: item.height
						};
						return set;
					});
					break;
				default:
					value = e.target.value;
			}
			onChange(value);
		}
	}
	public selectSearch(value: any) {
		if (this.props.onSearch && typeof this.props.onSearch === "function") {
			this.props.onSearch(value);
		}
	}
	//获取图片信息
	public readImgInfo(file: any) {
		if (!file) {
			return;
		}
		let reg = /^https?:\/\//;
		if (reg.test(file)) {
			return new Promise((resolve, reject) => {
				var img = new Image();
				img.src = file;
				img.onload = () => {
					resolve({
						width: img.width,
						height: img.height
					});
				};
			});
		} else {
			return new Promise((resolve, reject) => {
				try {
					let fileReader = new FileReader();
					fileReader.onload = (e: any) => {
						var data = e.target.result;
						var img = new Image();
						img.onload = () => {
							resolve({
								width: img.width,
								height: img.height
							});
						};
						img.src = data;
					};
					fileReader.readAsDataURL(file);
				} catch (e) {
					reject(e);
				}
			});
		}
	}
	public isImage(suf: string): boolean {
		let ia = ["jpg", "jpeg", "png", "gif", "bmp"];
		return ia.indexOf(suf) == -1 ? false : true;
	}
	public beforeUploader(file: any) {
		let { folder, domain, limitInfo } = this.props;

		if (!file) {
			return;
		}
		return new Promise(async (resolve, reject) => {
			let { limitSize, limitType } = this.props;
			let suffix = file.name.substr(
				file.name.lastIndexOf(".") + 1,
				file.name.length
			);
			if (limitSize < file.size) {
				notification.error({
					message: "上传",
					duration: 3,
					description: `上传文件大小超过限制，大小不能超过${limitSize /
						1024 /
						1024}M,此文件大小为${file.size / 1024 / 1024}M`
				});
				reject({ error: "文件大小错误" });
				return false;
			}
			if (limitType.length > 0) {
				if (limitType.indexOf(suffix) == -1) {
					notification.error({
						message: "上传",
						duration: 3,
						description: `文件格式错误，格式限定为${limitType.join(
							","
						)}`
					});
					reject({ error: "文件格式错误" });
					return false;
				}
			}

			if (
				limitInfo &&
				limitInfo.width &&
				limitInfo.height &&
				limitInfo.type &&
				this.isImage(suffix)
			) {
				let info: any = await this.readImgInfo(file);
				file.width = info.width;
				file.height = info.height;
				if (limitInfo.type === "equa") {
					if (
						limitInfo.width != info.width ||
						limitInfo.height != info.height
					) {
						notification.error({
							message: "上传",
							duration: 3,
							description: `文件尺寸错误，尺寸限定为${
								limitInfo.width
							}*${limitInfo.height}`
						});
						reject({ error: "文件尺寸错误" });
						return false;
					}
				}
				if (limitInfo.type === "less") {
					if (
						limitInfo.width > info.width ||
						limitInfo.height > info.height
					) {
						notification.error({
							message: "上传",
							duration: 3,
							description: `文件尺寸错误，尺寸小于${
								limitInfo.width
							}*${limitInfo.height}`
						});
						reject({ error: "文件尺寸错误" });
						return false;
					}
				}
				if (limitInfo.type === "greater") {
					if (
						limitInfo.width < info.width ||
						limitInfo.height < info.height
					) {
						notification.error({
							message: "上传",
							duration: 3,
							description: `文件尺寸错误，尺寸大于${
								limitInfo.width
							}*${limitInfo.height}`
						});
						reject({ error: "文件尺寸错误" });
						return false;
					}
				}
			}
			folder = /\/$/.test(folder) ? folder : folder + "/";
			let key = `${folder}${new Date().getTime()}_${parseInt(
				Math.random() * 1000000000 + ""
			)}.${suffix}`;
			file.serverUrl = domain + "/" + key;

			//验证图片尺寸

			if (key) {
				this.setState({
					uploadData: {
						...this.state.uploadData,
						key
					}
				});
				resolve();
			} else {
				reject();
			}
		});
	}
	public handlerUploaderChange({ file, fileList, event }: any) {
		let list: any[] = [];
		let isUploaded = true;
		fileList.map((item: any) => {
			if (item.status != "error") {
				if (item.status == "uploading" && event) {
					item.uploadPrcent = Math.round(event.loaded / event.total);
				}
				if (item.status == "uploading") {
					isUploaded = false;
				}
				list.push(item);
			} else {
				notification.warning({
					message: "上传",
					key: "uploader",
					duration: 3,
					description: `存在上传失败,请重新上传,上传错误原因：${
						item.error
					}`
				});
			}
		});

		this.setState(
			{
				fileList: list
			},
			() => {
				if (isUploaded) {
					this.inputChange(list);
				}
			}
		);
	}
	public uploadBtn() {
		return (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传</div>
			</div>
		);
	}
	public deleteClick(idx: number) {
		let { fileList } = this.state;
		let list = fileList;
		list.splice(idx, 1);
		this.setState({
			fileList: [...list]
		});
	}
	public render() {
		let {
			isMust,
			labelName,
			type,
			value,
			className,
			optionArr,
			length,
			mode,
			showTime,
			flexTop,
			disabled,
			format,
			filterOption,
			isFetch,
			desc,
			children,
			showSearch,
			listType,
			limitType,
			domain,
			multiple,
			placeholder
		} = this.props;
		let { fileList, uploadData } = this.state;
		let accpect = limitType.join(",");
		return (
			<div className={classnames("inputbox-container", className)}>
				<div
					className={classnames(
						"input-item",
						flexTop || (desc && desc.length > 0) ? "at" : ""
					)}
				>
					<div className="label-name">
						<span className="text">
							{labelName}
							<span />
						</span>
						<i className="must">{isMust && "*"}</i>
						<span>:</span>
					</div>
					<div className="label-input">
						{children}
						{!children && (
							<div>
								{(type === "text" ||
									type === "number" ||
									type === "tel" ||
									type === "password") && (
									<Input
										disabled={disabled}
										type={type}
										value={value}
										maxLength={length}
										placeholder={placeholder}
										onChange={this.inputChange.bind(this)}
									/>
								)}
								{type === "select" && (!mode && !showSearch) && (
									<Select
										disabled={disabled}
										value={Number(value)}
										onChange={this.inputChange.bind(this)}
										style={{ width: "100%" }}
										showSearch={showSearch}
									>
										{optionArr &&
											optionArr instanceof Array &&
											optionArr.length > 0 &&
											optionArr.map(
												(item: any, index: any) => {
													return (
														<Option
															key={index}
															value={Number(
																item.key
															)}
														>
															{item.label}
														</Option>
													);
												}
											)}
									</Select>
								)}
								{type === "select" && (mode || showSearch) && (
									<Select
										disabled={disabled}
										value={this.formatValue(value)}
										onChange={this.inputChange.bind(this)}
										filterOption={filterOption}
										style={{ width: "100%" }}
										mode={mode}
										showSearch={showSearch}
										notFoundContent={
											isFetch ? (
												<div
													style={{
														textAlign: "center"
													}}
												>
													<Spin size="small" />
													<span
														style={{
															fontSize: "12px",
															marginLeft: "10px"
														}}
													>
														正在搜索数据...
													</span>
												</div>
											) : (
												<div
													style={{
														textAlign: "center",
														fontSize: 12
													}}
												>
													暂无数据
												</div>
											)
										}
										onSearch={this.selectSearch.bind(this)}
									>
										{optionArr &&
											optionArr instanceof Array &&
											optionArr.length > 0 &&
											optionArr.map(
												(item: any, index: any) => {
													return (
														<Option
															key={index}
															value={Number(
																item.key
															)}
														>
															{item.label}
														</Option>
													);
												}
											)}
									</Select>
								)}
								{type === "datepicker" && (
									<DatePicker
										format={format}
										disabled={disabled}
										style={{ width: "100%" }}
										value={value}
										showTime={showTime}
										onChange={this.inputChange.bind(this)}
									/>
								)}
								{type === "textarea" && (
									<TextArea
										style={{ width: "100%" }}
										value={value}
										autosize={{ minRows: 4 }}
										onChange={this.inputChange.bind(this)}
									/>
								)}
								{type === "uploader-img" && (
									<div>
										{fileList.length > 0 &&
											fileList.map(
												(item: any, index: any) => {
													return (
														<div
															key={index}
															className="uploadImg"
														>
															{/* {item.status ==
																"error" &&
																"错误"} */}
															{item.status ==
																"error" && (
																<div className="img-box">
																	<img
																		src={
																			item.fileUrl
																		}
																	/>
																	<div className="img-cover">
																		<Icon
																			className="delete"
																			type="delete"
																			onClick={this.deleteClick.bind(
																				this,
																				index
																			)}
																		/>
																	</div>
																</div>
															)}
															{item.status ==
																"uploading" && (
																<div className="uploading">
																	<Icon
																		type="loading"
																		className="icon"
																	/>
																	<div>
																		上传中...
																	</div>
																</div>
															)}
														</div>
													);
												}
											)}
										<div
											style={{ display: "inline-block" }}
										>
											<Upload
												accept={accpect}
												data={uploadData}
												action={domain}
												listType={listType}
												onChange={this.handlerUploaderChange.bind(
													this
												)}
												multiple={multiple}
												showUploadList={false}
												fileList={fileList}
												beforeUpload={this.beforeUploader.bind(
													this
												)}
											>
												{fileList.length >=
												Number(length)
													? null
													: this.uploadBtn()}
											</Upload>
										</div>
									</div>
								)}
								{type === "uploader" && (
									<div>
										{fileList &&
											fileList.length > 0 &&
											fileList.map(
												(item: any, idx: any) => {
													return (
														<div
															key={idx}
															className="upload-item"
														>
															<div className="upload-info">
																<div className="filename">
																	{item.name}
																</div>
																{item.status ===
																	"success" && (
																	<Icon
																		type="close"
																		className="icon"
																		onClick={this.deleteClick.bind(
																			this,
																			idx
																		)}
																	/>
																)}
																{item.status ==
																	"uploading" && (
																	<span>
																		{item.uploadPrcent +
																			"%"}
																	</span>
																)}
															</div>
															{item.status ==
																"uploading" && (
																<div
																	className="uploadbg"
																	style={{
																		width:
																			item.uploadPrcent +
																			"%"
																	}}
																/>
															)}
														</div>
													);
												}
											)}

										<Upload
											accept={accpect}
											data={uploadData}
											action={domain}
											multiple={multiple}
											beforeUpload={this.beforeUploader.bind(
												this
											)}
											showUploadList={false}
											onChange={this.handlerUploaderChange.bind(
												this
											)}
										>
											{fileList.length >=
											Number(length) ? null : (
												<div className="uploadFile">
													选择文件
												</div>
											)}
										</Upload>
									</div>
								)}
							</div>
						)}
						{this.props.desc && this.props.desc.length > 0 && (
							<div
								style={{
									color: "#a4a4a4",
									textAlign: "left",
									marginTop: "0.02rem",
									paddingLeft: ".1rem",
									position: "relative",
									top: ".1rem"
								}}
							>
								{this.props.desc}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
