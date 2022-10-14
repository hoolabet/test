package org.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.test.mapper.TestMapper;
import org.test.model.ContentVO;
import org.test.model.MemberVO;

@Service
public class TestServiceImpl implements TestService{
	@Autowired
	TestMapper tm;
	
	public int save(ContentVO cvo) {
		return tm.save(cvo);
	}
	
	public ContentVO load(ContentVO cvo) {
		return tm.load(cvo);
	}
	
	public int remove(String tv) {
		return tm.remove(tv);
	}
	
	public int modify(ContentVO cvo) {
		return tm.modify(cvo);
	}
	
	public ContentVO loadHeader(ContentVO cvo) {
		return tm.loadHeader(cvo);
	}
	
	public ContentVO loadFooter(ContentVO cvo) {
		return tm.loadFooter(cvo);
	}
	
	public int saveHeader(ContentVO cvo) {
		return tm.saveHeader(cvo);
	}

	public int modifyHeader(ContentVO cvo){
		return tm.modifyHeader(cvo);
	}

	public int saveFooter(ContentVO cvo){
		return tm.saveFooter(cvo);
	}

	public int modifyFooter(ContentVO cvo){
		return tm.modifyFooter(cvo);
	}
	
	public ContentVO loadSignUp(ContentVO cvo) {
		return tm.loadSignUp(cvo);
	}

	public int saveSignUp(ContentVO cvo){
		return tm.saveSignUp(cvo);
	}

	public int modifySignUp(ContentVO cvo){
		return tm.modifySignUp(cvo);
	}
	
	public void createMemTable(String create_table) {
		tm.createMemTable(create_table);
	}
	
	public void dropTable(String tv) {
		tm.dropTable(tv);
	}
	
	public void createFirstAccount(MemberVO mvo) {
		tm.createFirstAccount(mvo);
	}
	
	public MemberVO login(MemberVO mvo) {
		return tm.login(mvo);
	}
	
	public int signUp(MemberVO mvo) {
		return tm.signUp(mvo);
	}
	
	public MemberVO dupCheck(MemberVO mvo) {
		return tm.dupCheck(mvo);
	}
	
	public MemberVO logOut(MemberVO mvo) {
		return tm.logOut(mvo);
	}
}
