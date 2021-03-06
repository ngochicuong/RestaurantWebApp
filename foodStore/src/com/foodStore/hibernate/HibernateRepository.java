package com.foodStore.hibernate;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.foodStore.model.OrderDetail;
import com.sun.msv.datatype.xsd.regex.Match;

public class HibernateRepository implements IRepository {
	private SessionFactory sessionFactory;

	@Override
	@Transactional
	public <T> T getItemById(Class<T> entityType , int id) {
		T item = (T) getSession().get(entityType, id);
		return item;
	}
	@Override
	@Transactional
	public <T> boolean deleteItem(T entity) {
		try {
			Session session = getSession();
			getSession().delete(entity);
		} catch (Exception exception) {
			return false;
		} finally {
			getSession().flush();
		}
		
		return true;
	}
	@Override
	@Transactional
	public <T> int save(T entity) {
		try {
			Session session = getSession();
			Serializable id = session.save(entity);
			return (int)id;
		} catch (Exception exception) {
			return -1;
		}
	}
	@Override
	@Transactional
	public <T> boolean addItems(List<T> entities) {
		for (T entity : entities) {
			save(entity);
		}
		return true;
	}
	
	protected Session getSession() {
		return this.getSessionFactory().getCurrentSession();
	}
	
	@Override
	@Transactional
	public <T> boolean updateItem(T entity) {
		try {
			getSession().update(entity);
		} catch (Exception ex)
		{
			System.out.println("ERROR" + ex);
			return false;
		}
		System.out.println("UPDATE SUCSSESS");
		return true;
	}
	@Override
	@Transactional
	public <T> List<T> getItemsWithOneKey(Class<T> entityType, CompareKey... keys) {
		Criteria criteria = getSession().createCriteria(entityType);
		Disjunction or = Restrictions.disjunction();
		for (CompareKey key : keys){
			if (key != null)
			or.add(Restrictions.ilike(key.getKey(), key.getValue()));
		}
		criteria.add(or);
		return (List<T>)criteria.list();
	}

	@Override
	@Transactional
	public <T> List<T> customQuery(Class<T> entityType, ICriteriaBuilder criteriaBuilder) {
		Criteria criteria = criteriaBuilder.build(getSession());
		return (List<T>)criteria.list();
	}
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public static class CompareKey {
		public CompareKey(String key, Object value){
			setKey(key);
			setValue(value);
		}
		private String key;
		private Object value;
		public String getKey() {
			return key;
		}
		public void setKey(String key) {
			this.key = key;
		}
		public Object getValue() {
			return value;
		}
		public void setValue(Object value) {
			this.value = value;
		}
	}
	public static interface ICriteriaBuilder {
		Criteria build(Session session);
	}
	@Override
	@Transactional
	public <T> List<T> getItemsWithAllKey(Class<T> entityType, CompareKey... keys) {
		Criteria criteria = getSession().createCriteria(entityType);
		Conjunction and = Restrictions.conjunction();
		for (CompareKey key : keys){
			if (key != null) 
			and.add(Restrictions.eq(key.getKey(), key.getValue()));
		}
		criteria.add(and);
		return (List<T>)criteria.list();
	}
	@Override
	@Transactional
	public <T> List<T> getAll(Class<T> entityType) {
		Criteria criteria = getSession().createCriteria(entityType);
		return (List<T>)criteria.list();
	}
	
	@Override
	public <T> List<? extends Object> runSqlQuery(String sqlCommand) {
		SQLQuery query = getSession().createSQLQuery(sqlCommand);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		return query.list();
	}
	
	
}
