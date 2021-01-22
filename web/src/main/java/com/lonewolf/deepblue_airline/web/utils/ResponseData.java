package com.lonewolf.deepblue_airline.web.utils;

public class ResponseData<T> {
	private int code;

	private String msg;

	private T data;

	public ResponseData() {

	}

	public ResponseData(ResponseCode responseCode) {
		code = responseCode.code();
		this.msg = responseCode.toString();
	}

	public ResponseData(ResponseCode responseCode, String msg) {
		this(responseCode);
		this.msg = msg;
	}

	public ResponseData(ResponseCode responseCode, String msg, T data) {
		this(responseCode, msg);
		this.data = data;
	}

	public int getCode() {
		return code;
	}

	public void setCode(ResponseCode responseCode) {
		this.code = responseCode.code();
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	// @Override
	// public String toString() {
	// return JSON;
	// }

}
