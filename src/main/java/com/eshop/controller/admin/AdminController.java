package com.eshop.controller.admin;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eshop.controller.BaseController;
import com.eshop.entity.Admin;
import com.eshop.service.AdminService;
import com.eshop.utils.PasswordUtils;
import com.eshop.vo.AdminPassport;

@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController{
	
	@Autowired AdminService adminService;
	
	/**
	 * 去登录页面
	 * @return
	 */
	@RequestMapping("/login")
	String login() {
		if(getAdminPassport() == null){
			return "/admin/login";
		}else{
			return "redirect:/admin/home";
		}
	}
	
	/**
	 * 登录
	 * @param account
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	@ResponseBody
	Object signIn(String account, String password,String card) {
		int status = 0;
		Admin admin = adminService.searchByAdminName(account);
		if(admin != null){
			PasswordUtils passwordUtils = new PasswordUtils();
			if(passwordUtils.isPasswordValid(admin.getPassword(), password, admin.getPasswordSalt())){
				AdminPassport passport = new AdminPassport();
				passport.setId(admin.getAdminId());
				httpSession.setAttribute(AdminPassport.PASSPORT_NAME, passport);
				status = 1;
			}else{
				status = -2;
			}
		}else{
			status = -1;
		}
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("account", account);
		model.put("status", status);
		return model;
	}
	
	/**
	 * 登出
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "/signout")
	String signOut() throws ServletException {
		request.logout();
		return "redirect:/admin/login";
	}
}
