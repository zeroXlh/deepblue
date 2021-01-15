var t;
layui.define(['form', 'layer','laydate'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	
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
	laydate.render({
		elem: '#yearDate',
		type: 'year',
		value:new Date(),
		done: function(value, date){
			planTrend(value);
		}
	});
	
	
	$("#date_time").html(dateNow());
	
	init();
	
	form.render();
	form.on('submit(sreach)', function(data){
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		if(startDate != '' && endDate != ''){
			$("#date_time").html(startDate+"至"+endDate);
		}
		if(startDate != '' && endDate == ''){
			$("#date_time").html(startDate+"至"+getLastDay());
		}

		if(startDate == '' && endDate != ''){
			layer.msg("开始时间不能为空",{icon:5,anim:6,time:3000});
			return false;
		}
		getPeriod();
		planBranch();
		
		return false;
	});
	
	
	function init(){
		getPeriod();
		setTimeout(function(){
			//要执行的事件
			var myDate = new Date();
			var year = myDate.getFullYear();
			planTrend(year);
			planBranch();
		},1000);
	}
	/**
	 * 数据统计
	 * @returns
	 */
	function getPeriod(){
		var beginTime = $("#startDate").val();
		var endTime = $("#endDate").val();
		var params = new HashMap();
		params.put("beginTime",beginTime);
		params.put("endTime",endTime);
		new RZAjax().param("/hoper/backweb/dataStore/plan/period","post",params,"json",function(data){
			if(data.code==1){
				if(data.data != null){
					if(data.data.model != null){
						$("#perTotalAmt").html(data.data.model.perTotalAmt);
						$("#perSoonAmt").html(data.data.model.perSoonAmt);
						$("#perOverAmt").html(data.data.model.perOverAmt);
						$("#perTotalNum").html(data.data.model.perTotalNum);
						$("#perSoonNum").html(data.data.model.perSoonNum);
						$("#perOverNum").html(data.data.model.perOverNum);
						$("#perTotalInt").html(data.data.model.perTotalInt);
						$("#perSoonInt").html(data.data.model.perSoonInt);
						$("#perOverInt").html(data.data.model.perOverInt);
						$("#perTotalPrin").html(data.data.model.perTotalPrin);
						$("#perSoonPrin").html(data.data.model.perSoonPrin);
						$("#perOverPrin").html(data.data.model.perOverPrin);
					}
					if(data.data.totalModel != null){
						//总的
						$("#perTotalAmts").html(data.data.totalModel.perTotalAmt);
						$("#perSoonAmts").html(data.data.totalModel.perSoonAmt);
						$("#perOverAmts").html(data.data.totalModel.perOverAmt);
						$("#perTotalNums").html(data.data.totalModel.perTotalNum);
						$("#perSoonNums").html(data.data.totalModel.perSoonNum);
						$("#perOverNums").html(data.data.totalModel.perOverNum);
						$("#perTotalInts").html(data.data.totalModel.perTotalInt);
						$("#perSoonInts").html(data.data.totalModel.perSoonInt);
						$("#perOverInts").html(data.data.totalModel.perOverInt);
						$("#perTotalPrins").html(data.data.totalModel.perTotalPrin);
						$("#perSoonPrins").html(data.data.totalModel.perSoonPrin);
						$("#perOverPrins").html(data.data.totalModel.perOverPrin);
					}
				}
				
			}else{
				layer.msg("加载失败",{icon:5,anim:6,time:3000});
			}
		});
	}

	/**
	 * 总回款趋势
	 * @param beginTime
	 * @returns
	 */
	function planTrend(beginTime){
		var params = new HashMap();
		params.put("beginTime",beginTime);
		new RZAjax().param("/hoper/backweb/dataStore/plan/planTrend","post",params,"json",function(data){
			if(data.code==1){
				echarts1(data);
			}else{
				layer.msg("总回款趋势加载失败",{icon:5,anim:6,time:3000});
			}
		});
	}

	/**
	 * 分公司总回款详情
	 */
	function planBranch(){
		var beginTime = $("#startDate").val();
		var endTime = $("#endDate").val();
		var params = new HashMap();
		params.put("beginTime",beginTime);
		params.put("endTime",endTime);
		new RZAjax().param("/hoper/backweb/dataStore/plan/planBranch","post",params,"json",function(data){
			if(data.code==1){
				echarts2(data);
			}else{
				layer.msg("分公司总回款详情加载失败",{icon:5,anim:6,time:3000});
			}
		});
	}
	
	/**
	 * 总回款趋势图
	 */
	function echarts1(data){
		var perTotalAmts = [];
		var perTotalNums = [];
		var planDates = [];
		if(data != null){
			if(data.data != null && data.data.length > 0){
				for(var i = 0; i < data.data.length; i++){
					perTotalAmts.push(data.data[i].perTotalAmt);
					perTotalNums.push(data.data[i].perTotalNum);
					planDates.push(data.data[i].planDate);
				}
			}
		}
		
		var dom = document.getElementById("container1");
		var myChart = echarts.init(dom);
		option = null;
		option = {
				title: {
	    	        text: '总回款趋势',
	    	        subtext: '单位：元',
	    	        left: 'center'
	    	    },
	    	    tooltip: {
	    	        trigger: 'axis',
	    	        axisPointer: {
	    	            type: 'cross'
	    	        },
	    	        formatter: function(params){
			        	return "回款时间："+params[0].name+"<br/>回款金额："+params[0].value+"元";
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
			        type: 'category',
			        data: planDates
			    },
			    yAxis: {
			        type: 'value',
			        min: 0,
			        axisLabel:{
                    	formatter:'{value}元'
                    }
			    },
			    series: [{
			        data: perTotalAmts,
			        type: 'line',
			        barMaxWidth:30,
			        smooth: false,
			        color:'#999999',
			        label: {
			        	show: "true",
						rotate:325,
	                    position: "top",
	                    formatter: function(params){
	                    	return '{color1|' + params.value + '元}\n{color2|' + perTotalNums[params.dataIndex] + '笔}';
	                    },
	                    rich: {
	                        color1: {color: '#ca8622'},
	                        color2: {color: '#000000'}
	                    }
		            }
			    }]
		};
		
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}
		window.addEventListener("resize",function(){
	        myChart.resize();
		});
		
	}
	
	/**
	 * 分公司总回款详情图
	 */
	function echarts2(data){
		var planTotalAmts = [];
		var planTotalNums = [];
		var branchOfficeNames = [];
		var colors = [];
		if(data != null){
			if(data.data != null && data.data.length > 0){
				
				for(var i = 0; i < data.data.length; i++){
					planTotalAmts.push(data.data[i].planTotalAmt);
					planTotalNums.push(data.data[i].planTotalNum);
					branchOfficeNames.push(data.data[i].branchOfficeName);
					colors.push(data.data[i].color);
				}
			}
		}		
		
		var dom = document.getElementById("container2");
		var myChart = echarts.init(dom);
		option = null;
		option = {
	            title: {
	    	        text: '分公司总回款详情',
	    	        subtext: '单位：元',
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
			        	return "分公司："+params[0].name+"<br/>回款金额："+params[0].value+" 元<br/>回款笔数："+planTotalNums[params[0].dataIndex]+"笔";
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
	                data: branchOfficeNames,
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
	                    	formatter:'{value}元'
	                    }
	                }
	            ],
	            series: [
	                {
	                    data: planTotalAmts,
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
	                    	/*
	                    	normal: {
	                    		show: "true",
	                    		position: "top",
		                        rotate:325,
		                        textStyle:{
		                        	fontSize: "12",
		                        	color: function(params) {
		                                return colors[params.dataIndex];
		                            }
		                        },
		                        formatter: function(params){
		                        	return '' + params.data + '元\n' + planTotalNums[params.dataIndex] + '笔';
		                        }
	                        }*/
	                        show: "true",
	                        position: "top",
	                        rotate:325,
	                        fontSize: "12",
	                        formatter: function(params){
	                        	return '{color1|' + params.data + '元}\n{color2|' + planTotalNums[params.dataIndex] + '笔}';
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
	exports('collection_data_warehouse', {});
});

