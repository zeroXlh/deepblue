
layui.define(['form', 'layer','laydate'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	var firstDate = new Date();
	firstDate.setDate(1); //第一天
	var endDate = new Date(firstDate);
	
	// 日期
	laydate.render({
		elem: '#startDate',
		format: 'yyyy-MM-dd'
	});
	laydate.render({
		elem: '#endDate',
		format: 'yyyy-MM-dd',
		done: function (value, date, endDate) {
			var startDate = new Date($('#startDate').val()).getTime();
			var endTime = new Date(value).getTime();
			if (endTime < startDate) {
				layer.msg("结束时间不能小于开始时间",{icon:5,anim:6,time:3000});
				$('#endDate').val($('#startDate').val());
			}
		}
	});
	
	$("#date1").html(dateNow());
	$("#date2").html(dateNow());
	
	
	form.render();
	form.on('submit(sreach)', function(data){
		var type = $("#select_type").find("option:selected").val();
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		if(startDate != '' && endDate != ''){
			$("#date1").html(startDate+"至"+endDate);
			$("#date2").html(startDate+"至"+endDate);
		}
		if(startDate != '' && endDate == ''){
			$("#date1").html(startDate+"至"+getLastDay());
			$("#date2").html(startDate+"至"+getLastDay());
		}
		if(type == ''){
			layer.msg("请选择您要查询的类型",{icon:5,anim:6,time:3000});
			return false;
		}
		if(startDate == '' && endDate != ''){
			layer.msg("开始时间不能为空",{icon:5,anim:6,time:3000});
			return false;
		}
		init();
		return false;
	});
	
	init();
	
	exports('performance_data_warehouse', {});
});

/**
 * 初始化
 * @returns
 */
function init(){
	totalAchieve();//默认本月业绩
	branchAchieve();//分公司业绩
	branchPersonAchieve();//分公司人均业绩图
	productCycleAchieve();//产品期限业绩分布
}
/**
 * 默认本月业绩
 * @returns
 */
function totalAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var beginTime = $("#startDate").val();
	var endTime = $("#endDate").val();
	
	var params = new HashMap();
	params.put("type",type);
	params.put("beginTime",beginTime);
	params.put("endTime",endTime);
	new RZAjax().param("/hoper/backweb/dataStore/achieve/totalAchieve","post",params,"json",function(data){
		if(data.code==1){
			if(data.data != null){
				$("#yearMoney").html(data.data.yearMoney);
				$("#investMoney").html(data.data.investMoney);
				$("#jjsYearMoney").html(data.data.jjsYearMoney);
				$("#jjsInvestMoney").html(data.data.jjsInvestMoney);
				$("#priFundYearMoney").html(data.data.priFundYearMoney);
				$("#priFundInvestMoney").html(data.data.priFundInvestMoney);
				$("#allYearMoney").html(data.data.allYearMoney);
				$("#allInvestMoney").html(data.data.allInvestMoney);
				if(type == 0){
					echarts3(data.data.jjsYearMoney,data.data.priFundYearMoney)//产品业绩分布
				}else if(type == 1){
					echarts3(data.data.jjsInvestMoney,data.data.priFundInvestMoney)//产品业绩分布
				}
				
			}
		}else{
			layer.msg("业绩加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司业绩
 * @returns
 */
function branchAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var beginTime = $("#startDate").val();
	var endTime = $("#endDate").val();
	
	var params = new HashMap();
	params.put("type",type);
	params.put("beginTime",beginTime);
	params.put("endTime",endTime);
	new RZAjax().param("/hoper/backweb/dataStore/achieve/branchAchieve","post",params,"json",function(data){
		if(data.code==1){
			echarts1(type,data);
		}else{
			layer.msg("分公司业绩加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司人均业绩图
 * @returns
 */
function branchPersonAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var beginTime = $("#startDate").val();
	var endTime = $("#endDate").val();
	
	var params = new HashMap();
	params.put("type",type);
	params.put("beginTime",beginTime);
	params.put("endTime",endTime);
	new RZAjax().param("/hoper/backweb/dataStore/achieve/branchPersonAchieve","post",params,"json",function(data){
		if(data.code==1){
			echarts2(type,data);			
		}else{
			layer.msg("分公司人均业绩图加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 产品期限业绩分布
 * @returns
 */
function productCycleAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var beginTime = $("#startDate").val();
	var endTime = $("#endDate").val();
	
	var params = new HashMap();
	params.put("type",type);
	params.put("beginTime",beginTime);
	params.put("endTime",endTime);
	new RZAjax().param("/hoper/backweb/dataStore/achieve/productCycleAchieve","post",params,"json",function(data){
		if(data.code==1){
			echarts4(type,data);		
		}else{
			layer.msg("产品期限业绩分布加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司业绩图
 * @param type
 * @param data
 * @returns
 */
function echarts1(type,data){
	
	var colors = [];
	var yName = [];
	var achieves = [];
	var rates = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				colors.push(data.data[i].color);
				yName.push(data.data[i].branchOfficeName);
				if(type == 0){
					achieves.push(data.data[i].branchYearAchieve);
					rates.push(data.data[i].branchYearRate);
				}else if(type == 1){
					achieves.push(data.data[i].branchInvestAchieve);
					rates.push(data.data[i].branchInvestRate);
				}						
			}
		}
	}
	
	var dom = document.getElementById("container1");
	var myChart = echarts.init(dom);

	option = null;
	option = {
            title: {
    	        text: '分公司业绩',
    	        subtext: '单位：万元',
    	        /*subtextStyle:{
    	            color:'#000000',
    	            fontSize:'14'
    	        },*/
    	        left: 'center'
    	    },
            tooltip: {
            	trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            crossStyle: {
		                color: '#999'
		            }
		        },
		        formatter: function(params){
		        	return "分公司："+params[0].name+"<br/>金额："+params[0].value+" 万元<br/>占比："+rates[params[0].dataIndex]+"%";
		        }
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: {
            	top: '20%',
                bottom:'20%'
            },
            xAxis: {
                type: "category",
                data: yName,
                axisLabel:{
		            　　　　 	show: true,
                	interval: 0,
                	rotate:40
                }
            },
            yAxis: [
                {
                    type: "value",
                    position: 'left',
                    min: 0,
                    axisLabel:{
                    	formatter:'{value}万元'
                    }
                }
            ],
            series: [
                {
                    data: achieves,
                    barMaxWidth:30,
                    type: "bar",
                    itemStyle: {
                        normal: {
                            // 每根柱子颜色设置
                            color: function(params) {
                                return colors[params.dataIndex];
                            }
                        }
                    },
                    label: {
                        show: "true",
                        position: "top",
                        color: "#1AAC1A",
                        fontSize: "12",
                        formatter: function(params){
                        	return '{color1|' + params.data + '万元}\n{color2|' + rates[params.dataIndex] + '%}';
                        },
                        rich: {
                            color1: {color: '#ca8622'},
                            color2: {color: '#000000'}
                        }
                    }
                }
            ]

	};
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	window.addEventListener("resize",function(){
        myChart.resize();
	});
}

/**
 * 分公司人均业绩图
 * @param type
 * @param data
 * @returns
 */
function echarts2(type,data){
	var colors = [];
	var yName = [];
	var numbers = [];
	var branchPerAchieves = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				colors.push(data.data[i].color);
				yName.push(data.data[i].branchOfficeName);
				numbers.push(data.data[i].num);
				if(type == 0){
					branchPerAchieves.push(data.data[i].branchPerYearAchieve);
				}else if(type == 1){
					branchPerAchieves.push(data.data[i].branchPerInvestAchieve);
				}			
			}
		}
	}
	
	var dom = document.getElementById("container2");
	var myChart = echarts.init(dom);
	option = null;
	option = {
            title: {
    	        text: '分公司人均业绩图',
    	        subtext: '单位：万元',
    	        left: 'center'
    	    },
            tooltip: {
            	trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            crossStyle: {
		                color: '#999'
		            }
		        },
    	    	formatter: function(params){
		        	return "分公司："+params[0].name+"<br/>人均金额："+params[0].value+" 万元<br/>人数："+numbers[params[0].dataIndex]+"人";
		        }
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: {
            	top: '20%',
                bottom:'20%'
            },
            xAxis: {
                type: "category",
                data: yName,
                axisLabel:{
		            　　　　 	show: true,
		        	interval: 0,
		        	rotate:40
		        }
            },
            yAxis: [
                {
                    type: "value",
                    position: 'left',
                    min: 0,
                    axisLabel:{
                    	formatter:'{value}万元'
                    }
                }
            ],
            series: [
                {
                    data: branchPerAchieves,
                    barMaxWidth:30,
                    type: "bar",
                    itemStyle: {
                        normal: {
                            // 每根柱子颜色设置
                            color: function(params) {
                                return colors[params.dataIndex];
                            }
                        }
                    },
                    label: {
                    	show: "true",
                        position: "top",
                        color: "#1AAC1A",
                        fontSize: "12",
                        formatter: function(params){
                        	return '{color1|' + params.data + '万元}\n{color2|' + numbers[params.dataIndex] + '人}';
                        },
                        rich: {
                            color1: {color: '#ca8622'},
                            color2: {color: '#000000'}
                        }
                    }
                }
            ]

	};
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	window.addEventListener("resize",function(){
        myChart.resize();
	});
}

/**
 * 产品业绩分布图
 * @param jjsMoney
 * @param priFundMoney
 * @returns
 */
function echarts3(jjsMoney,priFundMoney){
	var dom = document.getElementById("container3");
	var myChart = echarts.init(dom);
	option = null;
	
	option = {
	    title: {
	        text: '产品业绩分布',
	        subtext: '单位：万元',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '类型 : {b}<br/>金额 : {c} 万元<br/>占比 : {d}%' 
	    },
	    toolbox: {
	        show: true,
	        right:30,
	        feature: {
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        top:'100',
	        data: ['金交所', '私募']
	    },
	    series: [
	        {
	            type: 'pie',
	            radius: '40%',
	            center: ['50%', '60%'],
	            data: [
	                {value: jjsMoney, name: '金交所'},
	                {value: priFundMoney, name: '私募'}
	            ],
	            itemStyle: {
	                normal: {
	                	color: function(params) {
	                        //自定义颜色
	                        var colorList = ['#c23531', '#ca8622'];
	                        return colorList[params.dataIndex]
	                    },
	                    label:{ 
	                    	show: true, 
	                    	formatter: '类型 : {b}\n金额 : {c}万元\n占比 : {d}%' 
			            },
			            labelLine:{  
			            	length:30  
			            }
	                }
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	window.addEventListener("resize",function(){
        myChart.resize();
	});
}

/**
 * 产品期限业绩分布图
 * @param type
 * @param data
 * @returns
 */
function echarts4(type,data){
	var cycleNames = [];
	var cycleDatas = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				var obj = new Object();
				obj.name = data.data[i].cycleName;
				if(type == 0){
					obj.value = data.data[i].cycleYear;//年化
				}else if(type == 1){
					obj.value = data.data[i].cycleInvest;//业绩
				}
				cycleDatas[i] = obj;
				cycleNames.push(data.data[i].cycleName);
			}
		}
	}
	
	var dom = document.getElementById("container4");
	var myChart = echarts.init(dom);
	option = null;
	
	option = {
	    title: {
	        text: '产品期限业绩分布',
	        subtext: '单位：万元',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '期限 : {b}<br/>金额 : {c} 万元<br/>占比 : {d}%' 
	    },
	    toolbox: {
	        show: true,
	        right:30,
	        feature: {
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        top:'100',
	        data: cycleNames
	    },
	    series: [
	        {
	            type: 'pie',
	            radius: '40%',
	            center: ['50%', '60%'],
	            data: cycleDatas,
	            itemStyle: {
	                normal: {
	                	color: function(params) {
	                        //自定义颜色
	                        var colorList = ['#61a0a8','#91c7ae','#2f4554','#c23531','#ca8622'];
	                        return colorList[params.dataIndex]
	                    },
	                    label:{ 
	                    	show: true, 
	                    	formatter: '期限 : {b}\n金额 : {c}万元\n占比 : {d}%' 
			            },
			            labelLine:{  
			            	length:30  
			            }
	                }
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	window.addEventListener("resize",function(){
        myChart.resize();
	});
}

function dateNow(){
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	if(month < 10){
		month = "0"+month;
	}
	return year+"-"+month;
}
//获得某月的最后一天
function getLastDay() {
	var date = new Date();
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	var year = lastDay.getFullYear();
	var month = (lastDay.getMonth()+1);
	var day = lastDay.getDate();
	if(month < 10){
		month = "0"+month;
	}
	return year+"-"+month+"-"+day;
}