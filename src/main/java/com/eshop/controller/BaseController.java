package com.eshop.controller;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;

import com.eshop.vo.AdminPassport;

@Controller
public class BaseController {

	/**
	 * 注入的HttpServletRequest
	 */
	@Resource
	protected HttpServletRequest request;

	/**
	 * 注入的HttpServletResponse
	 */
	@Resource
	protected HttpServletResponse response;

	/**
	 * 注入的HttpSession
	 */
	@Resource
	protected HttpSession httpSession;

	/**
	 * 注入的ServletContext
	 */
	@Resource
	protected ServletContext servletContext;

	/**
	 * 获取用户登录护照
	 * 
	 * @return
	 */
	protected AdminPassport getAdminPassport() {
		Object object = httpSession.getAttribute(AdminPassport.PASSPORT_NAME);
		return (AdminPassport) object;
	}

	

	protected String getIpAddress() {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
}
