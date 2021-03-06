package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class OrderDetailAdapter extends Adapter implements JsonSerializer<OrderDetail> {
	@Override
	public JsonElement serialize(OrderDetail orderDetail, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", orderDetail.getId());
		jsonObject.addProperty("productId", orderDetail.getProduct().getId());
		jsonObject.addProperty("productName", orderDetail.getProduct().getProductName());
		jsonObject.addProperty("price", orderDetail.getPrice());
		jsonObject.addProperty("total", orderDetail.getTotal());
		jsonObject.addProperty("quality", orderDetail.getQuality());
		if (orderDetail.getLastUpdateTime() != null) {
			jsonObject.addProperty("lastUpdateTime", orderDetail.getLastUpdateTime().toString());
		}
		jsonObject.addProperty("usedUpdateTime", orderDetail.getUsedUpdateTime());
		jsonObject.addProperty("note", orderDetail.getNote());
		jsonObject.addProperty("refCode", orderDetail.getRefCode());
		return jsonObject;
	}
}
