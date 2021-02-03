package com.lonewolf.deepblue_airline.web.model;

import com.alibaba.fastjson.JSON;

public class ShellAttributes {
    private Integer shellCode;

    private Integer flightSpeed;

    private Integer lightArmorRatio;

    private Integer mediumArmorRatio;

    private Integer heavyArmorRatio;

    private Integer spottingScope;

    private Integer spottingAngle;

    private Integer rangeMin;

    private Integer rangeMax;

    private Integer intersperseAngle;

    private Integer damageRadius;

    private Integer intersperseScope;

    private String camp;

    private Integer amendRatio;

    private String damageType;

    private Integer efficiency;

    public Integer getShellCode() {
        return shellCode;
    }

    public void setShellCode(Integer shellCode) {
        this.shellCode = shellCode;
    }

    public Integer getFlightSpeed() {
        return flightSpeed;
    }

    public void setFlightSpeed(Integer flightSpeed) {
        this.flightSpeed = flightSpeed;
    }

    public Integer getLightArmorRatio() {
        return lightArmorRatio;
    }

    public void setLightArmorRatio(Integer lightArmorRatio) {
        this.lightArmorRatio = lightArmorRatio;
    }

    public Integer getMediumArmorRatio() {
        return mediumArmorRatio;
    }

    public void setMediumArmorRatio(Integer mediumArmorRatio) {
        this.mediumArmorRatio = mediumArmorRatio;
    }

    public Integer getHeavyArmorRatio() {
        return heavyArmorRatio;
    }

    public void setHeavyArmorRatio(Integer heavyArmorRatio) {
        this.heavyArmorRatio = heavyArmorRatio;
    }

    public Integer getSpottingScope() {
        return spottingScope;
    }

    public void setSpottingScope(Integer spottingScope) {
        this.spottingScope = spottingScope;
    }

    public Integer getSpottingAngle() {
        return spottingAngle;
    }

    public void setSpottingAngle(Integer spottingAngle) {
        this.spottingAngle = spottingAngle;
    }

    public Integer getRangeMin() {
        return rangeMin;
    }

    public void setRangeMin(Integer rangeMin) {
        this.rangeMin = rangeMin;
    }

    public Integer getRangeMax() {
        return rangeMax;
    }

    public void setRangeMax(Integer rangeMax) {
        this.rangeMax = rangeMax;
    }

    public Integer getIntersperseAngle() {
        return intersperseAngle;
    }

    public void setIntersperseAngle(Integer intersperseAngle) {
        this.intersperseAngle = intersperseAngle;
    }

    public Integer getDamageRadius() {
        return damageRadius;
    }

    public void setDamageRadius(Integer damageRadius) {
        this.damageRadius = damageRadius;
    }

    public Integer getIntersperseScope() {
        return intersperseScope;
    }

    public void setIntersperseScope(Integer intersperseScope) {
        this.intersperseScope = intersperseScope;
    }

    public String getCamp() {
        return camp;
    }

    public void setCamp(String camp) {
        this.camp = camp == null ? null : camp.trim();
    }

    public Integer getAmendRatio() {
        return amendRatio;
    }

    public void setAmendRatio(Integer amendRatio) {
        this.amendRatio = amendRatio;
    }

    public String getDamageType() {
        return damageType;
    }

    public void setDamageType(String damageType) {
        this.damageType = damageType == null ? null : damageType.trim();
    }

    public Integer getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(Integer efficiency) {
        this.efficiency = efficiency;
    }
    
    @Override
	public String toString() {
		return JSON.toJSONString(this);
	}
}