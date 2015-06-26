package com.eshop.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.eshop.vo.AdminPassport;
import com.eshop.vo.UserPassport;

/**
 * Created by Ash on 2015/1/12.
 */
public class PassportInterceptor extends HandlerInterceptorAdapter {
    @Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// HandlerMethod handlerMethod = (HandlerMethod)handler;
		String url = request.getServletPath();
		Map<String, Object> ignore = new HashMap<String, Object>();
		ignore.put("/admin/login", null);
		ignore.put("/admin/signin", null);
		ignore.put("/admin/signout", null);
		if (!ignore.containsKey(url)) {
			if (request.getServletPath().startsWith("/admin")) {
				if (request.getSession().getAttribute(
						AdminPassport.PASSPORT_NAME) == null) {
					response.sendRedirect(request.getContextPath()
							+ "/admin/login");
					return false;
				}
			} else {
				if (request.getSession().getAttribute(
						UserPassport.PASSPORT_NAME) == null) {
					return false;
				}
			}
		}
		return true;
	}
}
