package com.lonewolf.deepblue_airline.web.mapper;

import com.lonewolf.deepblue_airline.web.model.ShellAttributes;

public interface ShellAttributesMapper {
    int deleteByPrimaryKey(Integer shellCode);

    int insert(ShellAttributes record);

    int insertSelective(ShellAttributes record);

    ShellAttributes selectByPrimaryKey(Integer shellCode);

    int updateByPrimaryKeySelective(ShellAttributes record);

    int updateByPrimaryKey(ShellAttributes record);
}