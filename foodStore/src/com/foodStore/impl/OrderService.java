package com.foodStore.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Account;
import com.foodStore.model.Order;
import com.foodStore.model.OrderDetail;
import com.foodStore.model.SeatTable;
import com.foodStore.service.IOrderService;
import com.foodStore.service.ISeatTableService;

public class OrderService extends ServiceBase<Order> implements IOrderService{
	
	@Autowired
	ISeatTableService seatTableRepository;
	
	public OrderService(IRepository repository) {
		super(repository);
	}

	@Override
	public boolean setOnPay(Order order, boolean onPay) {
		order.setOnPay(onPay ? 't' : 'f');
		return this.repository.updateItem(order);
	}

	@Override
	public Order createOrder(int seatId, int accountId, String note, int customerId) {
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		if (seat == null || seat.getOnDesk() == 't') return null;
		Account account = this.repository.getItemById(Account.class, accountId);
		if (account == null) return null;
		
		Order order = new Order();
		order.setId(-1);
		order.setAccount(account);
		order.setSeatTable(seat);
		order.setRefCode(UUID.randomUUID().toString());
		order.setOnPay('f');
		order.setDateInsert(new Date());
		order.setNote(note);
		order.setCustomerId(customerId);
		seatTableRepository.setOnDesk(seatId, true);
		return save(order);
	}

	@Override
	public boolean updateOrderTotal(int orderId) {
		Order order = this.repository.getItemById(Order.class, orderId);
		Object total = this.repository.customQuery(OrderDetail.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(OrderDetail.class);
				criteria.add(Restrictions.eq("order", orderId));
				return criteria.setProjection(Projections.sum("total"));
			}
		});
		order.setTotal((double)total);
		return update(order);
	}

	@Override
	public Order getOrderWithSeat(int seatId) {
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		System.out.println(seat);
		if (seat == null) return null;
		List<Order> orders = (List<Order>) this.repository.getItemsWithAllKey(Order.class, new CompareKey("seatTable", seat));
		Order order = orders.size() == 0 ? null : orders.get(0);
		return order;
	}

}
