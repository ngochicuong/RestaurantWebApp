package com.foodStore.model;

public class Payment extends BaseModelObject{
	private double totalOnOrder, totalDiscount, totalToPay, realPay, Debt;
	private String paymentType, promosApply;
	private String refCode;
	public double getTotalOnOrder() {
		return totalOnOrder;
	}
	public void setTotalOnOrder(double totalOnOrder) {
		this.totalOnOrder = totalOnOrder;
	}
	public double getTotalDiscount() {
		return totalDiscount;
	}
	public void setTotalDiscount(double totalDiscount) {
		this.totalDiscount = totalDiscount;
	}
	public double getTotalToPay() {
		return totalToPay;
	}
	public void setTotalToPay(double totalToPay) {
		this.totalToPay = totalToPay;
	}
	public double getRealPay() {
		return realPay;
	}
	public void setRealPay(double realPay) {
		this.realPay = realPay;
	}
	public double getDebt() {
		return Debt;
	}
	public void setDebt(double debt) {
		Debt = debt;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getPromosApply() {
		return promosApply;
	}
	public void setPromosApply(String promosApply) {
		this.promosApply = promosApply;
	}
	public String getRefCode() {
		return refCode;
	}
	public void setRefCode(String refCode) {
		this.refCode = refCode;
	}
}
