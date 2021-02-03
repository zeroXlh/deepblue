package com.lonewolf.deepblue_airline.web.model;

import java.math.BigDecimal;

import com.alibaba.fastjson.JSON;

public class ShipboardArtilleryInformation {
    private Integer shellCode;

    private String name;

    private String rarity;

    private String scale;

    private Integer dph;

    private Integer fullDph;

    private Integer hit;

    private Integer damage;

    private Integer fullDamage;

    private BigDecimal firingRate;

    private BigDecimal fullFiringRate;

    private BigDecimal delay;

    private Integer cannonry;

    private Integer antiaircraft;

    private String ammunition;

    private Boolean reformatory;

    private Integer enhancedUpperLimit;

    private String wayOfGain;

    private String apply;

    private String box;

    private String esignDrawingSite;

    public Integer getShellCode() {
        return shellCode;
    }

    public void setShellCode(Integer shellCode) {
        this.shellCode = shellCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity == null ? null : rarity.trim();
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale == null ? null : scale.trim();
    }

    public Integer getDph() {
        return dph;
    }

    public void setDph(Integer dph) {
        this.dph = dph;
    }

    public Integer getFullDph() {
        return fullDph;
    }

    public void setFullDph(Integer fullDph) {
        this.fullDph = fullDph;
    }

    public Integer getHit() {
        return hit;
    }

    public void setHit(Integer hit) {
        this.hit = hit;
    }

    public Integer getDamage() {
        return damage;
    }

    public void setDamage(Integer damage) {
        this.damage = damage;
    }

    public Integer getFullDamage() {
        return fullDamage;
    }

    public void setFullDamage(Integer fullDamage) {
        this.fullDamage = fullDamage;
    }

    public BigDecimal getFiringRate() {
        return firingRate;
    }

    public void setFiringRate(BigDecimal firingRate) {
        this.firingRate = firingRate;
    }

    public BigDecimal getFullFiringRate() {
        return fullFiringRate;
    }

    public void setFullFiringRate(BigDecimal fullFiringRate) {
        this.fullFiringRate = fullFiringRate;
    }

    public BigDecimal getDelay() {
        return delay;
    }

    public void setDelay(BigDecimal delay) {
        this.delay = delay;
    }

    public Integer getCannonry() {
        return cannonry;
    }

    public void setCannonry(Integer cannonry) {
        this.cannonry = cannonry;
    }

    public Integer getAntiaircraft() {
        return antiaircraft;
    }

    public void setAntiaircraft(Integer antiaircraft) {
        this.antiaircraft = antiaircraft;
    }

    public String getAmmunition() {
        return ammunition;
    }

    public void setAmmunition(String ammunition) {
        this.ammunition = ammunition == null ? null : ammunition.trim();
    }

    public Boolean getReformatory() {
        return reformatory;
    }

    public void setReformatory(Boolean reformatory) {
        this.reformatory = reformatory;
    }

    public Integer getEnhancedUpperLimit() {
        return enhancedUpperLimit;
    }

    public void setEnhancedUpperLimit(Integer enhancedUpperLimit) {
        this.enhancedUpperLimit = enhancedUpperLimit;
    }

    public String getWayOfGain() {
        return wayOfGain;
    }

    public void setWayOfGain(String wayOfGain) {
        this.wayOfGain = wayOfGain == null ? null : wayOfGain.trim();
    }

    public String getApply() {
        return apply;
    }

    public void setApply(String apply) {
        this.apply = apply == null ? null : apply.trim();
    }

    public String getBox() {
        return box;
    }

    public void setBox(String box) {
        this.box = box == null ? null : box.trim();
    }

    public String getEsignDrawingSite() {
        return esignDrawingSite;
    }

    public void setEsignDrawingSite(String esignDrawingSite) {
        this.esignDrawingSite = esignDrawingSite == null ? null : esignDrawingSite.trim();
    }

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
    
}