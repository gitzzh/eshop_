package com.eshop.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@MappedSuperclass
public class StatefulEntity implements BaseEntity {

    private static final long serialVersionUID = 8457026993523262967L;

    /**
     * 正常状态
     */
    public static final Integer NORMAL_STATUS = 1;

    /**
     * 删除状态
     */
    public static final Integer DELETE_STATUS = 0;

    /**
     * 临时状态
     */
    public static final Integer TEMP_STATUS = -1;


    /**
     * 创建时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 状态
     */
    @Column(name = "status", length = 6)
    private Integer status;

    /**
     * 更新时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_time")
    private Date updateTime;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
