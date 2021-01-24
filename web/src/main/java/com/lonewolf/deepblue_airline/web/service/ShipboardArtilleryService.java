package com.lonewolf.deepblue_airline.web.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lonewolf.deepblue_airline.web.mapper.ShipboardArtilleryInformationMapper;
import com.lonewolf.deepblue_airline.web.model.ShipboardArtilleryInformation;
import com.lonewolf.deepblue_airline.web.model.auxiliary.Rarity;
import com.lonewolf.deepblue_airline.web.utils.lang.StringUtils;

@Service
@Transactional
public class ShipboardArtilleryService {

	@Autowired
	private ShipboardArtilleryInformationMapper mapper;

	// int deleteByPrimaryKey(Integer shellCode);

	@Transactional(rollbackFor = Exception.class)
	public int add(ShipboardArtilleryInformation record) throws Exception {
		Objects.requireNonNull(record, "创建对象实体为null");
		return mapper.insert(record);
	}

	public PageInfo<ShipboardArtilleryInformation> page(ShipboardArtilleryInformation information, Integer pageNum,
			Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		return new PageInfo<>(selectByBean(information));
	}

	public ShipboardArtilleryInformation selectByPrimaryKey(Integer shellCode) {
		Objects.requireNonNull(shellCode, "shellCode为null");
		return mapper.selectByPrimaryKey(shellCode);
	}

	public ShipboardArtilleryInformation obtainByPrimaryKey(Integer shellCode) {
		return Objects.requireNonNull(selectByPrimaryKey(shellCode));
	}

	public ShipboardArtilleryInformation selectByUnique(String name, Rarity rarity) {
		StringUtils.requireNonEmpty(name, "name为empty");
		return mapper.selectByUnique(name, rarity);
	}

	public ShipboardArtilleryInformation obtainByUnique(String name, Rarity rarity) {
		return Objects.requireNonNull(selectByUnique(name, rarity));
	}

	public List<ShipboardArtilleryInformation> selectByBean(ShipboardArtilleryInformation information) {
		// Objects.requireNonNull(information, "shellCode为null");
		// return mapper.selectByPrimaryKey(shellCode);
		return mapper.selectByBean(information);
	}

	@Transactional(rollbackFor = Exception.class)
	public int updateByPrimaryKeySelective(ShipboardArtilleryInformation record) throws Exception {
		Objects.requireNonNull(record, "更新对象实体为null");
		Objects.requireNonNull(record.getShellCode(), "shellCode为null");
		return mapper.updateByPrimaryKeySelective(record);
	}

}
