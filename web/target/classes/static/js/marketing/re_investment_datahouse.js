var t;
layui.define(['form', 'layer','laydate'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	
	// 日期
	laydate.render({
		elem: '#yearDate1',
		type: 'year',
		value:new Date(),
		done: function(value, date){
			getUserRate(value);
		}
	});
	laydate.render({
		elem: '#yearDate2',
		type: 'month',
		value:new Date(),
		done: function(value, date){
			getBranchRate(value);
		}
	});
	
	laydate.render({
		elem: '#yearDate3',
		type:'year',
		value:new Date(),
		done: function(value, date){
			getMoneyRate(value);
		}
	});

	laydate.render({
		elem: '#yearDate4',
		type:'month',
		value:new Date(),
		done: function(value, date){
			getBranchMoneyRate(value);
		}
	});
	
	init();
	
	exports('re_investment_datahouse', {});
});

function init(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	if(month < 10){
		month = "0"+month;
	}
	getUserRate(year);
	getBranchRate(year+"-"+month);
	getMoneyRate(year);
	getBranchMoneyRate(year+"-"+month);
}

/**
 * 客户复投率曲线
 * @returns
 */
function getUserRate(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/reInvest/userRate","post",params,"json",function(data){
		if(data.code==1){
			echarts1(data);
		}else{
			layer.msg("客户复投率曲线加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司复投率
 * @returns
 */
function getBranchRate(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/reInvest/branchRate","post",params,"json",function(data){
		if(data.code==1){
			echarts2(data);
		}else{
			layer.msg("分公司复投率加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 客户复投金额比率曲线
 * @param beginTime
 * @returns
 */
function getMoneyRate(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/reInvest/moneyRate","post",params,"json",function(data){
		if(data.code==1){
			echarts3(data);
		}else{
			layer.msg("客户复投金额比率加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司复投金额比率
 * @param beginTime
 * @returns
 */
function getBranchMoneyRate(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/reInvest/branchMoneyRate","post",params,"json",function(data){
		if(data.code==1){
			echarts4(data);
		}else{
			layer.msg("分公司复投金额比率加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 客户复投率曲线图
 * @param data
 * @returns
 */
function echarts1(data){
	
	var reInvestUserNums = [];//复投人数
	var limitNums = [];//到期人数
	var reInvestRates = [];//复投率
	var monthName = [];//月份
	
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				reInvestUserNums.push(data.data[i].reInvestUserNums);
				limitNums.push(data.data[i].limitNums);
				reInvestRates.push(data.data[i].reInvestRates);
				monthName.push(data.data[i].monthName);
			}
		}
	}
	
	var dom = document.getElementById("container1");
	var myChart = echarts.init(dom);
	
	option = null;

	var colors = ['#ec651a', '#999999'];


	option = {
	    color: colors,
	    title: {
	        text: '复投率曲线图',
	        subtext: '单位：人',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross'
	        },
	        formatter: function(params){
	        	var len = params.length;
	        	if(len == 1){
	        		if(params[0].seriesName == '复投人数'){
	        			return "时间："+params[0].name+"<br/>复投人数："+params[0].value+"人<br/>复投率："+reInvestRates[params[0].dataIndex]+"%";
		        	}else if(params[0].seriesName == '到期人数'){
		        		return "时间："+params[0].name+"<br/>到期人数："+params[0].value+"人";
		        	}
	        	}else{
	        		return "时间："+params[0].name+"<br/>复投人数："+params[0].value+"人<br/>到期人数："+params[1].value+"人<br/>复投率："+reInvestRates[params[0].dataIndex]+"%";
	        	}	        	
	        }
	    },
	    legend: {
	    	left:'right',
	        data:['复投人数', '到期人数']
	    },
	    toolbox: {
	    	top:30,
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
	    xAxis: [
	        {
	            type: 'category',
	            data: monthName
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
	    series: [
	        {
	            name: '复投人数',
	            type: 'line',
	            smooth: false,
	            color:colors[0],
	            barMaxWidth:30,
	            data: reInvestUserNums
	        },
	        {
	            name: '到期人数',
	            type: 'line',
	            smooth: false,
	            color:colors[1],
	            barMaxWidth:30,
	            data: limitNums,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[1],
                    fontSize: "12",
                    formatter: function(params){
                    	return '{color3|' + reInvestRates[params.dataIndex] + '%}\n{color2|' + limitNums[params.dataIndex] + '人}\n{color1|' + reInvestUserNums[params.dataIndex] + '人}';
                    },
                    rich: {
                        color1: {color: colors[0]},
                        color2: {color: colors[1]},
                        color3: {color: '#000000'}
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
 * 分公司复投率图
 * @param data
 * @returns
 */
function echarts2(data){
	
	var reInvestUserNums = [];//复投人数
	var limitNums = [];//到期人数
	var reInvestRates = [];//复投率
	var branchOfficeNames = [];//分公司
	var colors = [];
	
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				reInvestUserNums.push(data.data[i].reInvestUserNums);
				limitNums.push(data.data[i].limitNums);
				reInvestRates.push(data.data[i].reInvestRates);
				branchOfficeNames.push(data.data[i].branchOfficeName);
				colors.push(data.data[i].color);
			}
		}
	}
	
	var dom = document.getElementById("container2");
	var myChart = echarts.init(dom);
	option = null;

	var colors = ['#ec651a', '#999999'];
	
	option = {
			title: {
    	        text: '分公司复投率',
    	        subtext: '单位：人',
    	        left: 'center'
    	    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },
		        formatter: function(params){
		        	var len = params.length;
		        	if(len == 1){
		        		if(params[0].seriesName == '复投人数'){
		        			return "分公司："+params[0].name+"<br/>复投人数："+params[0].value+"人<br/>复投率："+reInvestRates[params[0].dataIndex]+"%";
			        	}else if(params[0].seriesName == '到期人数'){
			        		return "分公司："+params[0].name+"<br/>到期人数："+params[0].value+"人";
			        	}
		        	}else{
		        		return "分公司："+params[0].name+"<br/>复投人数："+params[0].value+"人<br/>到期人数："+params[1].value+"人<br/>复投率："+reInvestRates[params[0].dataIndex]+"%";
		        	}	   
		        }
		    },
		    toolbox: {
		    	top:30,
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
            	top: '15%',
                bottom:'30%'
            },
		    legend: {
		    	left:'right',
		        data: ['复投人数', '到期人数']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: branchOfficeNames,
		            axisLabel:{
			            　　　　	show: true,
		                interval: 0,
		                rotate:40
			            　　 	}
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            min: 0
		        }
		    ],
		    series: [
		        {
		            name: '复投人数',
		            type: 'bar',
		            color:colors[0],
		            data: reInvestUserNums,
		            barMaxWidth:30,
		            label: {
			        	show: "true",
	                    position: "top",
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return '{color1|' + params.data + '人}\n{color2|' + reInvestRates[params.dataIndex] + '%}';
	                    },
	                    rich: {
	                        color1: {color: colors[0]},
	                        color2: {color: '#000000'}
	                    }
		            }
		        },
		        {
		            name: '到期人数',
		            type: 'bar',
		            color:colors[1],
		            data: limitNums,
		            barMaxWidth:30,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[1],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return '' + params.data + '人';
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
 * 客户复投金额比率曲线图
 * @param data
 * @returns
 */
function echarts3(data){
	
	var reInvestMoney = [];//复投金额
	var limitMoney = [];//到期金额
	var reInvestRates = [];//金额比率
	var monthName = [];//月份
	
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				reInvestMoney.push(data.data[i].reInvestMoney);
				limitMoney.push(data.data[i].limitMoney);
				reInvestRates.push(data.data[i].reInvestRates);
				monthName.push(data.data[i].monthName);
			}
		}
	}
	
	var dom = document.getElementById("container3");
	var myChart = echarts.init(dom);
	option = null;
	
	var colors = ['#ec651a', '#999999'];

	option = {
	    color: colors,
	    title: {
	        text: '复投金额比率曲线图',
	        subtext: '单位：万元',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross'
	        },
	        formatter: function(params){
	        	var len = params.length;
	        	if(len == 1){
	        		if(params[0].seriesName == '复投金额'){
	        			return "时间："+params[0].name+"<br/>复投金额："+params[0].value+"万元<br/>金额比率："+reInvestRates[params[0].dataIndex]+"%";
		        	}else if(params[0].seriesName == '到期金额'){
		        		return "时间："+params[0].name+"<br/>到期金额："+params[0].value+"万元";
		        	}
	        	}else{
	        		return "时间："+params[0].name+"<br/>复投金额："+params[0].value+"万元<br/>到期金额："+params[1].value+"万元<br/>金额比率："+reInvestRates[params[0].dataIndex]+"%";
	        	}
	        }
	    },
	    toolbox: {
	    	top:30,
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
	    legend: {
	    	left:'right',
	        data:['复投金额', '到期金额']
	    },
	    grid: {
        	top: '20%',
            bottom:'20%'
        },
	    xAxis: [
	        {
	            type: 'category',
	            data: monthName
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
            	min: 0
	        }
	    ],
	    series: [
	        {
	            name: '复投金额',
	            type: 'line',
	            smooth: false,
	            color:colors[0],
	            barMaxWidth:30,
	            data: reInvestMoney
	        },
	        {
	            name: '到期金额',
	            type: 'line',
	            smooth: false,
	            color:colors[1],
	            barMaxWidth:30,
	            data: limitMoney,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[1],
                    fontSize: "12",
                    formatter: function(params){
                    	return '{color3|' + reInvestRates[params.dataIndex] + '%}\n{color2|' + limitMoney[params.dataIndex] + '万元}\n{color1|' + reInvestMoney[params.dataIndex] + '万元}';
                    },
                    rich: {
                        color1: {color: colors[0]},
                        color2: {color: colors[1]},
                        color3: {color: '#000000'}
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
 * 分公司复投金额比率图
 * @param data
 * @returns
 */
function echarts4(data){
	
	var reInvestBranchMoney = [];//复投金额
	var limitBranchMoney = [];//到期金额
	var reInvestRates = [];//金额比率
	var branchOfficeName = [];//分公司
	var colors = [];
	
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				reInvestBranchMoney.push(data.data[i].reInvestBranchMoney);
				limitBranchMoney.push(data.data[i].limitBranchMoney);
				reInvestRates.push(data.data[i].reInvestRates);
				branchOfficeName.push(data.data[i].branchOfficeName);
				colors.push(data.data[i].color);
			}
		}
	}
	
	var dom = document.getElementById("container4");
	var myChart = echarts.init(dom);
	option = null;
	
	var colors = ['#ec651a', '#999999'];
	
	option = {
			title: {
    	        text: '分公司复投金额比率',
    	        subtext: '单位：万元',
    	        left: 'center'
    	    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },
		        formatter: function(params){
		        	var len = params.length;
		        	if(len == 1){
		        		if(params[0].seriesName == '复投金额'){
		        			return "分公司："+params[0].name+"<br/>复投金额："+params[0].value+"万元<br/>金额比率："+reInvestRates[params[0].dataIndex]+"%";
			        	}else if(params[0].seriesName == '到期金额'){
			        		return "分公司："+params[0].name+"<br/>到期金额："+params[0].value+"万元";
			        	}
		        	}else{
		        		return "分公司："+params[0].name+"<br/>复投金额："+params[0].value+"万元<br/>到期金额："+params[1].value+"万元<br/>金额比率："+reInvestRates[params[0].dataIndex]+"%";
		        	}
		        }
		    },
		    grid: {
            	top: '15%',
                bottom:'30%'
            },
		    legend: {
		    	left:'right',
		        data: ['复投金额', '到期金额']
		    },
		    toolbox: {
		    	top:30,
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
		    xAxis: [
		        {
		            type: 'category',
		            data: branchOfficeName,
		            axisLabel:{
			            　　　　	show: true,
		                interval: 0,
		                rotate:40
			            　　 	}
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            min: 0
		        }
		    ],
		    series: [
		        {
		            name: '复投金额',
		            type: 'bar',
		            color:colors[0],
		            data: reInvestBranchMoney,
		            barMaxWidth:30,
		            label: {
			        	show: "true",
	                    position: "top",
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return '{color1|' + params.data + '万元}\n{color2|' + reInvestRates[params.dataIndex] + '%}';
	                    },
	                    rich: {
	                        color1: {color: colors[0]},
	                        color2: {color: '#000000'}
	                    }
		            }
		        },
		        {
		            name: '到期金额',
		            type: 'bar',
		            color:colors[1],
		            data: limitBranchMoney,
		            barMaxWidth:30,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[1],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return '' + params.data + '万元';
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

