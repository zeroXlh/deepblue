package com.lonewolf.deepblue_airline.web.mapper;

import com.lonewolf.deepblue_airline.web.model.AirDefenseArtilleryInfo;

public interface AirDefenseArtilleryInfoMapper {
    int deleteByPrimaryKey(Integer airDefenseCode);

    int insert(AirDefenseArtilleryInfo record);

    int insertSelective(AirDefenseArtilleryInfo record);

    AirDefenseArtilleryInfo selectByPrimaryKey(Integer airDefenseCode);

    int updateByPrimaryKeySelective(AirDefenseArtilleryInfo record);

    int updateByPrimaryKey(AirDefenseArtilleryInfo record);
}