package com.lonewolf.deepblue_airline.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lonewolf.deepblue_airline.web.model.ShipboardArtilleryInformation;
import com.lonewolf.deepblue_airline.web.model.auxiliary.Rarity;

public interface ShipboardArtilleryInformationMapper {
	int deleteByPrimaryKey(Integer shellCode);

	int insert(ShipboardArtilleryInformation record);

	int insertSelective(ShipboardArtilleryInformation record);

	ShipboardArtilleryInformation selectByPrimaryKey(Integer shellCode);

	ShipboardArtilleryInformation selectByUnique(@Param("name") String name, @Param("rarity") Rarity rarity);

	List<ShipboardArtilleryInformation> selectByBean(ShipboardArtilleryInformation information);

	int updateByPrimaryKeySelective(ShipboardArtilleryInformation record);

	int updateByPrimaryKey(ShipboardArtilleryInformation record);
}