package com.eshop.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.eshop.dao.BaseDAO;
import com.eshop.service.BaseService;
import com.eshop.utils.page.ListInfo;

@Transactional
public class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {

	@Autowired
	private BaseDAO<T, ID> baseDAO;
	
	@Override
	public Integer countAll() {
		return baseDAO.countAll();
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@Override
	public T searchById(ID id) {
		return baseDAO.getById(id);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@Override
	public int countByMap(Map<String, Object> equalMap,
			Map<String, Object> notEqualMap, Map<String, Object> likeMap,
			Map<String, Object[]> inMap, Map<String, Object> startMap,
			Map<String, Object> endMap, String[] fetchNames) {
		return baseDAO.countByMap(equalMap, notEqualMap, likeMap, inMap,
				startMap, endMap, fetchNames);
	}

	@Override
	public void remove(T entity) {
		baseDAO.delete(entity);
	}

	@Override
	public void removeById(ID id) {
		baseDAO.deleteById(id);
	}

	@Override
	public int removeByIds(ID[] ids) {
		return baseDAO.deleteByIds(ids);
	}

	@Override
	public int createOrEditEntities(T[] entities) {
		return baseDAO.insertOrUpdateEntities(entities);
	}

	@Override
	public ListInfo<T> searchByMapAlias(Map<String, Object> equalMap,
			Map<String, Object> notEqualMap, Map<String, Object> likeMap,
			Map<String, Object[]> inMap, Map<String, Object> startMap,
			Map<String, Object> endMap, String[] fetchNames, String orderName,
			boolean isDesc, int currentPageNO, int pageSize,
			Map<String, String> aliasMap) {
		ListInfo<T> listInfo = new ListInfo<T>(currentPageNO, pageSize);
		listInfo.setCurrentList(baseDAO.findByMapAlias(equalMap, notEqualMap,
				likeMap, inMap, startMap, endMap, fetchNames, orderName,
				isDesc, listInfo.getFirst(), pageSize, aliasMap));
		listInfo.setSizeOfTotalList(baseDAO.countByMapAlias(equalMap,
				notEqualMap, likeMap, inMap, startMap, endMap, fetchNames,
				aliasMap));
		return listInfo;
	}

	@Override
	public ListInfo<T> searchByMapAlias(Map<String, Object> equalMap,
			Map<String, Object> notEqualMap, Map<String, Object> likeMap,
			Map<String, Object[]> orMap, Map<String, Object[]> inMap,
			Map<String, Object> startMap, Map<String, Object> endMap,
			String[] fetchNames, String orderName, boolean isDesc,
			int currentPageNO, int pageSize, Map<String, String> aliasMap) {
		ListInfo<T> listInfo = new ListInfo<T>(currentPageNO, pageSize);
		listInfo.setCurrentList(baseDAO.findByMapAlias(equalMap, notEqualMap,
				likeMap, orMap, inMap, startMap, endMap, fetchNames, orderName,
				isDesc, listInfo.getFirst(), pageSize, aliasMap));
		listInfo.setSizeOfTotalList(baseDAO.countByMapAlias(equalMap,
				notEqualMap, likeMap, orMap, inMap, startMap, endMap,
				fetchNames, aliasMap));
		return listInfo;
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@Override
	public List<T> getByIds(ID[] ids) {
		return baseDAO.findByIds(ids);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@Override
	public T searchById(ID id, String[] fetchNames) {
		return baseDAO.getById(id, fetchNames);
	}

	@Override
	public List<T> getAll() {
		return baseDAO.findAll();
	}

	@Override
	public void save(T entity) {
		baseDAO.save(entity);		
	}

	@Override
	public void saveOrUpdate(T entity) {
		this.baseDAO.saveOrUpdate(entity);
	}

	@Override
	public ListInfo<T> searchByMap(Map<String, Object> equalMap,
			Map<String, Object> notEqualMap, Map<String, Object> likeMap,
			Map<String, Object[]> inMap, Map<String, Object> startMap,
			Map<String, Object> endMap, String[] fetchNames, String orderName,
			boolean isDesc, int currentPageNO, int pageSize) {
		ListInfo<T> listInfo = new ListInfo<T>(currentPageNO, pageSize);
		listInfo.setCurrentList(baseDAO.findByMap(equalMap, notEqualMap,
				likeMap, inMap, startMap, endMap, fetchNames, orderName,
				isDesc, listInfo.getFirst(), pageSize));
		listInfo.setSizeOfTotalList(baseDAO.countByMap(equalMap, notEqualMap,
				likeMap, inMap, startMap, endMap, fetchNames));
		return listInfo;
	}
}
