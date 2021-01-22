package com.lonewolf.deepblue_airline.web.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lonewolf.deepblue_airline.web.mapper.ShellAttributesMapper;
import com.lonewolf.deepblue_airline.web.model.ShellAttributes;

@Service
@Transactional
public class ShellAttributesService {

	@Autowired
	private ShellAttributesMapper mapper;

	@Transactional(rollbackFor = Exception.class)
	public int add(ShellAttributes record) throws Exception {
		Objects.requireNonNull(record, "新增炮弹参数entity为null");
		return mapper.insert(record);
	}

}
