package com.foodStore.impl;

import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Order;
import com.foodStore.model.Payment;
import com.foodStore.service.IPaymentService;

public class PaymentService extends ServiceBase<Payment> implements IPaymentService {

	public PaymentService(IRepository repository) {
		super(repository);
	}

	@Override
	public Payment createPayment(String refCode, double realPay) {
//		Payment payment = new Payment();
//		payment.setId(-1);
//		payment.setRefCode(refCode);
//		payment.setRealPay(realPay);
//		payment.setTotalOnOrder(order.getTotal());
//		payment.setTotalToPay(order.getTotal());
//		payment.setDebt(order.getTotal() - realPay);
		return null;
	}

}
