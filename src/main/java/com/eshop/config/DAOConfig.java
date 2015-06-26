package com.eshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.eshop.dao.AdminDAO;
import com.eshop.dao.impl.AdminDAOImpl;

/**
 * DAO配置
 */
@Configuration
public class DAOConfig {

	@Bean
	public AdminDAO adminDAO() {
		return new AdminDAOImpl();
	}

}
