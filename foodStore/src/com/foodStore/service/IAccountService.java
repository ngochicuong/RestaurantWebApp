package com.foodStore.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.foodStore.model.Account;

public interface IAccountService {
	@Transactional
	Account login(Account account);
	void logout(Account account);
	@Transactional
	boolean changePassword(Account account, String password);
	boolean setActive(Account account, boolean active);
	List<Account> getAllAccountWithOnline(boolean online);
	List<Account> getAllAccountWithActive(boolean active);
	
	boolean createAccount(String user, String pass, String email, int role);
	List<Account> getAllAccount();
	List<Account> getAccountByUser(String user);
	boolean updateAccount(int userId, String user, String pass, String email, int role);
	
}