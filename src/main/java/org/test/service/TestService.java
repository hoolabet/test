package org.test.service;

import org.test.model.ContentVO;

public interface TestService {
	public int save(ContentVO cvo);

	public ContentVO load(ContentVO cvo);

	public int remove(String tv);

	public int modify(ContentVO cvo);
}
