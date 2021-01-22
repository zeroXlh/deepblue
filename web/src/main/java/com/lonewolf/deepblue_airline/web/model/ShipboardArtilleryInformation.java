package com.lonewolf.deepblue_airline.web.model;

import java.math.BigDecimal;

public class ShipboardArtilleryInformation {
    private Integer shellCode;

    private String name;

    private String scale;

    private Integer hitCardinal;

    private Integer hitInstance;

    private Integer damage;

    private BigDecimal firingRate;

    private Integer cannonry;

    private String ammunition;

    private String rarity;

    private Boolean reformatory;

    private Integer enhancedUpperLimit;

    private String wayOfGain;

    private String apply;

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

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale == null ? null : scale.trim();
    }

    public Integer getHitCardinal() {
        return hitCardinal;
    }

    public void setHitCardinal(Integer hitCardinal) {
        this.hitCardinal = hitCardinal;
    }

    public Integer getHitInstance() {
        return hitInstance;
    }

    public void setHitInstance(Integer hitInstance) {
        this.hitInstance = hitInstance;
    }

    public Integer getDamage() {
        return damage;
    }

    public void setDamage(Integer damage) {
        this.damage = damage;
    }

    public BigDecimal getFiringRate() {
        return firingRate;
    }

    public void setFiringRate(BigDecimal firingRate) {
        this.firingRate = firingRate;
    }

    public Integer getCannonry() {
        return cannonry;
    }

    public void setCannonry(Integer cannonry) {
        this.cannonry = cannonry;
    }

    public String getAmmunition() {
        return ammunition;
    }

    public void setAmmunition(String ammunition) {
        this.ammunition = ammunition == null ? null : ammunition.trim();
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity == null ? null : rarity.trim();
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
}