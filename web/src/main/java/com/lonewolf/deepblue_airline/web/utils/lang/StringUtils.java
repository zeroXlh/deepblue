package com.lonewolf.deepblue_airline.web.utils.lang;

public class StringUtils extends org.apache.commons.lang3.StringUtils {
	private StringUtils() {
		throw new AssertionError("The StringUtils don't should instantiation");
	}

//	public static boolean isEmpty(String s) {
//		// org.springframework.util.StringUtils.isEmpty(str)
//		return null == s || "".equals(s);
//	}
	
//	public static boolean isBlank(final CharSequence cs) {
//		final int strLen = length(cs);
//        if (strLen == 0) {
//            return true;
//        }
//        for (int i = 0; i < strLen; i++) {
//            if (!Character.isWhitespace(cs.charAt(i))) {
//                return false;
//            }
//        }
//        return true;
//	}
	
//	public static int length(final CharSequence cs) {
//        return cs == null ? 0 : cs.length();
//    }
//
//	public static boolean nonEmpty(String s) {
//		return !isEmpty(s);
//	}

	public static String requireNonEmpty(String s) {
		return requireNonEmpty(s, null);
	}

	public static String requireNonEmpty(String s, String msg) {
		if (isEmpty(s))
			throw new NullPointerException(msg);
		return s;
	}

}
