package org.test.mapper;

import org.test.model.ContentVO;
import org.test.model.MemberVO;

public interface TestMapper {

	public int save(ContentVO cvo);

	public ContentVO load(ContentVO cvo);

	public int remove(String tv);

	public int modify(ContentVO cvo);

	public ContentVO loadHeader(ContentVO cvo);

	public ContentVO loadFooter(ContentVO cvo);

	public int saveHeader(ContentVO cvo);

	public int modifyHeader(ContentVO cvo);

	public int saveFooter(ContentVO cvo);

	public int modifyFooter(ContentVO cvo);

	public ContentVO loadSignUp(ContentVO cvo);

	public int saveSignUp(ContentVO cvo);

	public int modifySignUp(ContentVO cvo);

	public void createMemTable(String create_table);

	public void dropTable(String tv);

	public void createFirstAccount(MemberVO mvo);

	public MemberVO login(MemberVO mvo);

	public int signUp(MemberVO mvo);

}
