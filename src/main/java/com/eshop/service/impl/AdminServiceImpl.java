package com.eshop.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.eshop.dao.AdminDAO;
import com.eshop.entity.Admin;
import com.eshop.service.AdminService;

/**
 * Created by Ash on 2015/5/22.
 */
@Transactional
public class AdminServiceImpl extends BaseServiceImpl<Admin, Integer> implements AdminService {

    @Autowired
    protected AdminDAO adminDAO;

    @Override
    public Admin searchByAdminName(String adminName) {
    	// TODO Auto-generated method stub
    	return adminDAO.findByAdminName(adminName);
    }

}
