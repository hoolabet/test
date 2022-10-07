package org.test.service;

import org.test.model.ContentVO;

public interface TestService {
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
}
