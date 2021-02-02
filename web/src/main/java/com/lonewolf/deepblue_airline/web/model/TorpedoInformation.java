package com.lonewolf.deepblue_airline.web.model;

import java.math.BigDecimal;

public class TorpedoInformation {
    private Integer torpedoCode;

    private String name;

    private Integer lightning;

    private Integer dph;

    private Integer fullDph;

    private Integer hit;

    private Integer damage;

    private Integer fullDamage;

    private BigDecimal firingRate;

    private BigDecimal fullFiringRate;

    private Integer enhancedUpperLimit;

    private String ammunition;

    private Integer speed;

    private Integer lightArmorRatio;

    private Integer mediumArmorRatio;

    private Integer heavyArmorRatio;

    private Integer damageRadius;

    private Integer rangeMin;

    private Integer rangeMax;

    private Integer intersperseAngle;

    private String camp;

    private Integer amendRatio;

    private String damageType;

    private Integer efficiency;

    private String box;

    private String esignDrawingSite;

    private Boolean reformatory;

    private String apply;

    public Integer getTorpedoCode() {
        return torpedoCode;
    }

    public void setTorpedoCode(Integer torpedoCode) {
        this.torpedoCode = torpedoCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getLightning() {
        return lightning;
    }

    public void setLightning(Integer lightning) {
        this.lightning = lightning;
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

    public Integer getEnhancedUpperLimit() {
        return enhancedUpperLimit;
    }

    public void setEnhancedUpperLimit(Integer enhancedUpperLimit) {
        this.enhancedUpperLimit = enhancedUpperLimit;
    }

    public String getAmmunition() {
        return ammunition;
    }

    public void setAmmunition(String ammunition) {
        this.ammunition = ammunition == null ? null : ammunition.trim();
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
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

    public Integer getDamageRadius() {
        return damageRadius;
    }

    public void setDamageRadius(Integer damageRadius) {
        this.damageRadius = damageRadius;
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

    public Boolean getReformatory() {
        return reformatory;
    }

    public void setReformatory(Boolean reformatory) {
        this.reformatory = reformatory;
    }

    public String getApply() {
        return apply;
    }

    public void setApply(String apply) {
        this.apply = apply == null ? null : apply.trim();
    }
}