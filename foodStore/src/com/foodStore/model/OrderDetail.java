package com.foodStore.model;

import java.util.Date;

public class OrderDetail extends BaseModelObject {
	private double price, total, quality;
	private Date lastUpdateTime;
	private String usedUpdateTime, note;
	private Product product;
	private String refCode;
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}
	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	public String getUsedUpdateTime() {
		return usedUpdateTime;
	}
	public void setUsedUpdateTime(String usedUpdateTime) {
		this.usedUpdateTime = usedUpdateTime;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public double getQuality() {
		return quality;
	}
	public void setQuality(double quality) {
		this.quality = quality;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public String getRefCode() {
		return refCode;
	}
	public void setRefCode(String refCode) {
		this.refCode = refCode;
	}
	
}
