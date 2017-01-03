package com.foodStore.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Account;
import com.foodStore.model.AccountAdapter;
import com.foodStore.model.Roles;
import com.foodStore.model.SeatAdapter;
import com.foodStore.model.SeatTable;
import com.foodStore.service.IAccountService;
import com.foodStore.service.ISeatTableService;
import com.foodStore.service.ServiceManagement;

@Controller
public class MainController {
	@RequestMapping(value = "/main.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String startMain(ModelMap model) {
		return "Main";
	}
	
	@RequestMapping(value = "/login.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	public String login(
			@RequestParam("user") String user,
			@RequestParam("pass") String pass,
			ModelMap model) {
		Account account = new Account();
		account.setUser(user);
		account.setPass(pass);
		Account result = ServiceManagement.get(IAccountService.class).login(account);
		if (result == null) return "{}";
		result.setPass(null);
		return JsonUtil.build(Account.class, new AccountAdapter()).toJson(result);
	}
	
}
