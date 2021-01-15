var t;
layui.define(['form', 'layer','laydate'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	
	// 日期
	laydate.render({
		elem: '#startDate',
		type: 'month',
		value:new Date(),
		done: function(value, date){
			getPeriod(value);
		}
	});
	laydate.render({
		elem: '#yearDate1',
		type: 'year',
		value:new Date(),
		done: function(value, date){
			getCustTrend(value);
		}
	});
	laydate.render({
		elem: '#yearDate2',
		type: 'month',
		value:new Date(),
		done: function(value, date){
			getBranchCustTrend(value);
		}
	});
	laydate.render({
		elem: '#yearDate3',
		type: 'year',
		value:new Date(),
		done: function(value, date){
			getEmployeeTrend(value);
		}
	});
	laydate.render({
		elem: '#yearDate4',
		type: 'month',
		value:new Date(),
		done: function(value, date){
			getBranchEmployeeTrend(value);
		}
	});
	
	init();
	
	
	exports('personnel_data_warehouse', {});
});
function init(){
	var myDate = new Date();
	var year = myDate.getFullYear();

	getPeriod(dateNow());
	getCustTrend(year);
	getBranchCustTrend(dateNow());
	getEmployeeTrend(year);
	getBranchEmployeeTrend(dateNow());
}

function getPeriod(startDate){
	var params = new HashMap();
	params.put("beginTime",startDate);
	new RZAjax().param("/hoper/backweb/dataStore/otherQuery/period","post",params,"json",function(data){
		if(data.code==1){
			if(data.data != null){
				var str = startDate.split("-");
				var now = parseInt(str[1]);
				if(data.data.customer != null){
					$("#totalCusts").html(data.data.customer.totalCusts);
					$("#totalEffCusts").html(data.data.customer.totalEffCusts);
					$("#addCusts_date").html(now+"月");
					$("#addCusts").html(data.data.customer.addCusts);
					$("#effCusts_date").html(now+"月");
					$("#effCusts").html(data.data.customer.effCusts);
					$("#complexCusts").html(data.data.customer.complexCusts);
					$("#millionCusts").html(data.data.customer.millionCusts);
				}
				
				if(data.data.employee != null){
					$("#totalEmployees").html(data.data.employee.totalEmployees);
					$("#totalLeaveEmployees").html(data.data.employee.totalLeaveEmployees);
					$("#addEmployees").html(data.data.employee.addEmployees);
					$("#addEmployees_date").html(now+"月");
					$("#leaveEmployees").html(data.data.employee.leaveEmployees);
					$("#leaveEmployees_date").html(now+"月");
				}
			}
			
		}else{
			layer.msg("加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 客户增长趋势
 * @param beginTime
 * @returns
 */
function getCustTrend(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/otherQuery/custTrend","post",params,"json",function(data){
		if(data.code==1){
			echarts1(data);
		}else{
			layer.msg("客户增长趋势加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司客户增长
 * @param beginTime
 * @returns
 */
function getBranchCustTrend(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/otherQuery/branchCustTrend","post",params,"json",function(data){
		if(data.code==1){
			echarts2(data);
		}else{
			layer.msg("分公司客户增长加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 员工增员、离职趋势
 * @param beginTime
 * @returns
 */
function getEmployeeTrend(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/otherQuery/employeeTrend","post",params,"json",function(data){
		if(data.code==1){
			echarts3(data);
		}else{
			layer.msg("员工增员、离职趋势加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司增员、离职
 * @param beginTime
 * @returns
 */
function getBranchEmployeeTrend(beginTime){
	var params = new HashMap();
	params.put("beginTime",beginTime);
	new RZAjax().param("/hoper/backweb/dataStore/otherQuery/branchEmployeeTrend","post",params,"json",function(data){
		if(data.code==1){
			echarts4(data);
		}else{
			layer.msg("分公司增员、离职加载失败",{icon:5,anim:6,time:3000});
		}
	});
}



/**
 * 客户增长趋势图
 * @param data
 * @returns
 */
function echarts1(data){
	var newCusts = [];
	var effCusts = [];
	var monthName = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				newCusts.push(data.data[i].newCusts);
				effCusts.push(data.data[i].effCusts);
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
	        text: '客户增长趋势图',
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
	        		if(params[0].seriesName == '新增客户'){
	        			return "时间："+params[0].name+"<br/>新增客户："+params[0].value+"人<br/>";
	        		}else if(params[0].seriesName == '有效客户'){
	        			return "时间："+params[0].name+"<br/>有效客户："+params[0].value+"人";
	        		}
	        	}else{
	        		return "时间："+params[0].name+"<br/>新增客户："+params[0].value+"人<br/>有效客户："+params[1].value+"人";
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
	        data:['新增客户', '有效客户']
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
	            name: '新增客户',
	            type: 'line',
	            smooth: false,
	            color:colors[0],
	            barMaxWidth:30,
	            data: newCusts,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[0],
                    fontSize: "12",
                    formatter: function(params){
                    	return params.value+"人";
                    }
	            }
	        },
	        {
	            name: '有效客户',
	            type: 'line',
	            smooth: false,
	            color:colors[1],
	            barMaxWidth:30,
	            data: effCusts,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[1],
                    fontSize: "12",
                    formatter: function(params){
                    	return params.value+"人";
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
 * 分公司客户增长图
 * @param data
 * @returns
 */
function echarts2(data){
	var newCusts = [];
	var effCusts = [];
	var branchOfficeName = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				newCusts.push(data.data[i].newCusts);
				effCusts.push(data.data[i].effCusts);
				branchOfficeName.push(data.data[i].branchOfficeName);
			}
		}
	}
	
	var dom = document.getElementById("container2");
	var myChart = echarts.init(dom);
	option = null;
	
	var colors = ['#ec651a', '#999999'];
	
	option = {
			title: {
    	        text: '分公司客户增长图',
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
		        		if(params[0].seriesName == '新增客户'){
		        			return "分公司："+params[0].name+"<br/>新增客户："+params[0].value+"人<br/>";
		        		}else if(params[0].seriesName == '有效客户'){
		        			return "分公司："+params[0].name+"<br/>有效客户："+params[0].value+"人";
		        		}
		        	}else{
		        		return "分公司："+params[0].name+"<br/>新增客户："+params[0].value+"人<br/>有效客户："+params[1].value+"人";
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
		        data: ['新增客户', '有效客户']
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
		            name: '新增客户',
		            type: 'bar',
		            color:colors[0],
		            barMaxWidth:30,
		            data: newCusts,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[0],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return params.value+"人";
	                    }
		            }
		        },
		        {
		            name: '有效客户',
		            type: 'bar',
		            color:colors[1],
		            barMaxWidth:30,
		            data: effCusts,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[1],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return params.value+"人";
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
 * 员工增员、离职趋势图
 * @param data
 * @returns
 */
function echarts3(data){
	var newEmployees = [];
	var leaveEmployees = [];
	var monthName = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				newEmployees.push(data.data[i].newEmployees);
				leaveEmployees.push(data.data[i].leaveEmployees);
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
	        text: '员工增员、离职趋势图',
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
	        		if(params[0].seriesName == '增员'){
	        			return "时间："+params[0].name+"<br/>增员："+params[0].value+"人<br/>";
	        		}else if(params[0].seriesName == '离职'){
	        			return "时间："+params[0].name+"<br/>离职："+params[0].value+"人";
	        		}
	        	}else{
	        		return "时间："+params[0].name+"<br/>增员："+params[0].value+"人<br/>离职："+params[1].value+"人";
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
	        data:['增员', '离职']
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
	            name: '增员',
	            type: 'line',
	            smooth: false,
	            color:colors[0],
	            barMaxWidth:30,
	            data: newEmployees,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[0],
                    fontSize: "12",
                    formatter: function(params){
                    	return params.value+"人";
                    }
	            }
	        },
	        {
	            name: '离职',
	            type: 'line',
	            smooth: false,
	            color:colors[1],
	            barMaxWidth:30,
	            data: leaveEmployees,
	            label: {
		        	show: "true",
                    position: "top",
                    color: colors[1],
                    fontSize: "12",
                    formatter: function(params){
                    	return params.value+"人";
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
 * 分公司增员、离职图
 * @param data
 * @returns
 */
function echarts4(data){
	var newEmployees = [];
	var leaveEmployees = [];
	var branchOfficeName = [];
	if(data != null){
		if(data.data != null && data.data.length > 0){
			for(var i = 0; i < data.data.length; i++){
				newEmployees.push(data.data[i].newEmployees);
				leaveEmployees.push(data.data[i].leaveEmployees);
				branchOfficeName.push(data.data[i].branchOfficeName);
			}
		}
	}
	var dom = document.getElementById("container4");
	var myChart = echarts.init(dom);
	
	var colors = ['#ec651a', '#999999'];
	
	option = {
			title: {
    	        text: '分公司增员、离职',
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
		        		if(params[0].seriesName == '增员'){
		        			return "分公司："+params[0].name+"<br/>增员："+params[0].value+"人<br/>";
		        		}else if(params[0].seriesName == '离职'){
		        			return "分公司："+params[0].name+"<br/>离职："+params[0].value+"人";
		        		}
		        	}else{
		        		return "分公司："+params[0].name+"<br/>增员："+params[0].value+"人<br/>离职："+params[1].value+"人";
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
		        data: ['增员', '离职']
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
		            name: '增员',
		            type: 'bar',
		            color:colors[0],
		            barMaxWidth:30,
		            data: newEmployees,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[0],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return params.value+"人";
	                    }
		            }
		        },
		        {
		            name: '离职',
		            type: 'bar',
		            color:colors[1],
		            barMaxWidth:30,
		            data: leaveEmployees,
		            label: {
			        	show: "true",
	                    position: "top",
	                    color: colors[1],
	                    fontSize: "12",
	                    formatter: function(params){
	                    	return params.value+"人";
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

