package com.lonewolf.deepblue_airline.web.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lonewolf.deepblue_airline.web.model.ShellAttributes;
import com.lonewolf.deepblue_airline.web.model.ShipboardArtilleryInformation;
import com.lonewolf.deepblue_airline.web.service.ShellAttributesService;
import com.lonewolf.deepblue_airline.web.service.ShipboardArtilleryService;

@Service
@Transactional
public class ShipboardArtilleryBusinessService {

	@Autowired
	private ShipboardArtilleryService shipboardArtilleryService;

	@Autowired
	private ShellAttributesService shellAttributesService;

	/**
	 * 新增舰炮信息
	 * 
	 * @param information
	 *            舰炮信息
	 * @param shellAttributes
	 *            舰炮炮弹参数
	 * @return
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Exception.class)
	public int add(ShipboardArtilleryInformation information, ShellAttributes shellAttributes) throws Exception {

		shipboardArtilleryService.add(information);

		shellAttributes.setShellCode(information.getShellCode());
		return shellAttributesService.add(shellAttributes);
	}
}
