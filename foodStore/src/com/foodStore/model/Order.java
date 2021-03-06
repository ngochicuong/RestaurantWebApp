package com.foodStore.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Order extends BaseModelObject {
	private int customerId;
	private Date dateInsert;
	private double total;
	private char onPay;
	private String note;
	private SeatTable seatTable;
	private Account account;
	private String refCode;
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public Date getDateInsert() {
		return dateInsert;
	}
	public void setDateInsert(Date dateInsert) {
		this.dateInsert = dateInsert;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public char getOnPay() {
		return onPay;
	}
	public void setOnPay(char onPay) {
		this.onPay = onPay;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	public SeatTable getSeatTable() {
		return seatTable;
	}
	public void setSeatTable(SeatTable seatTable) {
		this.seatTable = seatTable;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public String getRefCode() {
		return refCode;
	}
	public void setRefCode(String refCode) {
		this.refCode = refCode;
	}
}
