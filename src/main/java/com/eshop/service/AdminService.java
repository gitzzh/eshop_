package com.eshop.service;

import com.eshop.entity.Admin;

/**
 * Created by Ash on 2015/5/22.
 */
public interface AdminService extends BaseService<Admin, Integer> {
	Admin searchByAdminName(String adminName);
    
}
