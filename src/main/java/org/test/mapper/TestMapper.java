package org.test.mapper;

import org.test.model.ContentVO;

public interface TestMapper {

	public int save(ContentVO cvo);

	public ContentVO load(ContentVO cvo);

	public int remove(String tv);

	public int modify(ContentVO cvo);

}
