package com.eshop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 管理员
 * 
 *
 */
@Entity
@Table(name = "admin")
public class Admin extends StatefulEntity {

	/**
	 * SID
	 */
	private static final long serialVersionUID = 8309761980836294238L;

	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "admin_id")
	private Integer adminId;
	/**
	 * 登录账号
	 */
	@Column(name = "admin_name", length = 100)
	private String adminName;

	/**
	 * 密码
	 */
	@Column(name = "password", length = 100)
	private String password;

	/**
	 * 加密密钥
	 */
	@Column(name = "password_salt", length = 100)
	private String passwordSalt;

	/**
	 * 操作密码
	 */
	@Column(name = "operate_password", length = 100)
	private String operatePassword;

	/**
	 * 真实名称
	 */
	@Column(name = "real_name", length = 100)
	private String realName;



	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordSalt() {
		return passwordSalt;
	}

	public void setPasswordSalt(String passwordSalt) {
		this.passwordSalt = passwordSalt;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getOperatePassword() {
		return operatePassword;
	}

	public void setOperatePassword(String operatePassword) {
		this.operatePassword = operatePassword;
	}
	

}
