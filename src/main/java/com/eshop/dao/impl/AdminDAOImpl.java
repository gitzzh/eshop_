package com.eshop.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.eshop.dao.AdminDAO;
import com.eshop.entity.Admin;

/**
 * Created by Ash on 2015/5/22.
 */
public class AdminDAOImpl extends BaseDAOImpl<Admin, Integer> implements
		AdminDAO {

	@Override
	public Admin findByAdminName(String adminName) {
		Criteria criteria = getSession().createCriteria(Admin.class)
				.add(Restrictions.eq("status", Admin.NORMAL_STATUS))
				.add(Restrictions.eq("adminName", adminName));
		return (Admin) criteria.uniqueResult();
	}

}
