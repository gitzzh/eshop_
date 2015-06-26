package com.eshop.dao;

import com.eshop.entity.Admin;

/**
 * Created by Ash on 2015/5/22.
 */
public interface AdminDAO extends BaseDAO<Admin, Integer> {

    Admin findByAdminName(String adminName);
    
}
