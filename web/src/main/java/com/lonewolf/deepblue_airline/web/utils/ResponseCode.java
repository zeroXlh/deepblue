package com.lonewolf.deepblue_airline.web.utils;

public enum ResponseCode {
	FAIL, SUCC;

	// private String code;

	public int code() {
		return ordinal();
	}
	
	public static void main(String[] args) {
		System.out.println(SUCC.code());
		System.out.println(FAIL.code());
	}
}
