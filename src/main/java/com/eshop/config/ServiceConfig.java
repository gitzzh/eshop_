package com.eshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.eshop.service.AdminService;
import com.eshop.service.impl.AdminServiceImpl;

/**
 * Service 配置文件
 */
@Configuration
public class ServiceConfig {

	@Bean
	AdminService adminService() {
		return new AdminServiceImpl();
	}
}
