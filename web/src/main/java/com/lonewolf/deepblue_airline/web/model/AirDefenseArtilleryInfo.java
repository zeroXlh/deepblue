package com.lonewolf.deepblue_airline.web.model;

import java.math.BigDecimal;

public class AirDefenseArtilleryInfo {
    private Integer airDefenseCode;

    private String name;

    private Integer antiaircraft;

    private Integer damage;

    private Integer fullDamage;

    private BigDecimal firingRate;

    private BigDecimal fullFiringRate;

    private Integer enhancedUpperLimit;

    private Integer spottingScope;

    private Integer spottingAngle;

    private String camp;

    private Integer amendRatio;

    private String esignDrawingSite;

    private Boolean reformatory;

    private String box;

    public Integer getAirDefenseCode() {
        return airDefenseCode;
    }

    public void setAirDefenseCode(Integer airDefenseCode) {
        this.airDefenseCode = airDefenseCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getAntiaircraft() {
        return antiaircraft;
    }

    public void setAntiaircraft(Integer antiaircraft) {
        this.antiaircraft = antiaircraft;
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

    public Integer getEnhancedUpperLimit() {
        return enhancedUpperLimit;
    }

    public void setEnhancedUpperLimit(Integer enhancedUpperLimit) {
        this.enhancedUpperLimit = enhancedUpperLimit;
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

    public String getEsignDrawingSite() {
        return esignDrawingSite;
    }

    public void setEsignDrawingSite(String esignDrawingSite) {
        this.esignDrawingSite = esignDrawingSite == null ? null : esignDrawingSite.trim();
    }

    public Boolean getReformatory() {
        return reformatory;
    }

    public void setReformatory(Boolean reformatory) {
        this.reformatory = reformatory;
    }

    public String getBox() {
        return box;
    }

    public void setBox(String box) {
        this.box = box == null ? null : box.trim();
    }
}