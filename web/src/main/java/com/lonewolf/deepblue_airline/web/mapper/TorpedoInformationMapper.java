package com.lonewolf.deepblue_airline.web.mapper;

import com.lonewolf.deepblue_airline.web.model.TorpedoInformation;

public interface TorpedoInformationMapper {
    int deleteByPrimaryKey(Integer torpedoCode);

    int insert(TorpedoInformation record);

    int insertSelective(TorpedoInformation record);

    TorpedoInformation selectByPrimaryKey(Integer torpedoCode);

    int updateByPrimaryKeySelective(TorpedoInformation record);

    int updateByPrimaryKey(TorpedoInformation record);
}