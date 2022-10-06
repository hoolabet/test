package org.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.test.mapper.TestMapper;
import org.test.model.ContentVO;

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
}
