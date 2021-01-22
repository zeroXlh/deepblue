package com.lonewolf.deepblue_airline.web.model.extension;

import com.lonewolf.deepblue_airline.web.model.ShellAttributes;
import com.lonewolf.deepblue_airline.web.model.ShipboardArtilleryInformation;

public class ShipboardArtilleryInformationExtension extends ShipboardArtilleryInformation {
	private ShellAttributes shellAttributes;

	public ShellAttributes getShellAttributes() {
		return shellAttributes;
	}

	public void setShellAttributes(ShellAttributes shellAttributes) {
		this.shellAttributes = shellAttributes;
	}
	
}
