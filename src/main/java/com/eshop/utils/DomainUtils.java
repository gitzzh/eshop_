package com.eshop.utils;

import org.springframework.web.context.request.RequestContextHolder;

public class DomainUtils {
	public static String getAssets(){
		return "http://127.0.0.1:8088/eshop/assets";
	}
	public static String getVersionCode(){
		return "20150401";
	}
	public static String getLocalDomain(){
		RequestContextHolder.getRequestAttributes();
		return "http://127.0.0.1:8088/eshop";
	}
}
