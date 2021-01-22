package com.lonewolf.deepblue_airline.web.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class Md5Utils {
	/**
	 * MD5算法加密，返回大写加密串
	 * 
	 * @param data
	 * @return
	 */
	public static String md5Hex(String data) {
		return md5HexLower(data).toUpperCase();
	}

	/**
	 * MD5算法加密，返回小写加密串
	 * 
	 * @param data
	 * @return
	 */
	public static String md5HexLower(String data) {
		return DigestUtils.md5Hex(data);
	}

	 static void main(String[] args) {
		String data = "123456";
		String phoneNo = "13100123456";
		System.out.println(Md5Utils.md5Hex(phoneNo.substring(phoneNo.length() - 6)));

		System.out.println(md5Hex(data));
		System.out.println(md5HexLower(data));
	}
}
