var form;
var layer;
layui.define(['form', 'layer'], function(exports){
	form = layui.form;
	layer = layui.layer;
	
	getProductList();
	
	
	form.render();
	form.on('submit(sreach)', function(data){
		var type = $("#select_type").find("option:selected").val();
		
		if(type == ''){
			layer.msg("请选择您要查询的类型",{icon:5,anim:6,time:3000});
			return false;
		}
		var productId = $("#select_product_type").find("option:selected").val();
		if(productId == ''){
			layer.msg("请选择您要查询的产品类型",{icon:5,anim:6,time:3000});
			return false;
		}
		proSubCycleAchieve();
		proBranchAchieve();
		return false;
	});
	
	exports('product_performance_warehouse', {});
});

/**
 * 产品名称集合
 * @returns
 */
function getProductList(){
	var product = $('#select_product_type');
	product.empty();
	product.append("<option value=\"\">请选择</option>");
	new RZAjax().post("/hoper/backweb/dataStore/achieve/productSubList","post",null,"json",function(data){
		if(data.code==1){
			if(data.data != null && data.data.length > 0){
				for(var i = 0; i < data.data.length; i++){
					if(i == 0){
						product.append("<option value=\'"+data.data[i].id+"\' selected=\"selected\">"+data.data[i].productName+"</option>");
					}else{
						product.append("<option value=\'"+data.data[i].id+"\'>"+data.data[i].productName+"</option>");
					}
				}
				form.render("select");//重点：重新渲染select
			}
			proSubCycleAchieve();
			proBranchAchieve();
		}else{
			layer.msg("产品名称加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 产品期限分布
 * @returns
 */
function proSubCycleAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var productId = $("#select_product_type").find("option:selected").val();

	var params = new HashMap();
	params.put("type",type);
	params.put("productId",productId);

	new RZAjax().param("/hoper/backweb/dataStore/achieve/proSubCycleAchieve","post",params,"json",function(data){
		if(data.code==1){
			echarts1(type,data);
		}else{
			layer.msg("产品期限分布图加载失败",{icon:5,anim:6,time:3000});
		}
	});
}

/**
 * 分公司业绩分布
 * @returns
 */
function proBranchAchieve(){
	var type = $("#select_type").find("option:selected").val();
	var productId = $("#select_product_type").find("option:selected").val();

	var params = new HashMap();
	params.put("type",type);
	params.put("productId",productId);

	new RZAjax().param("/hoper/backweb/dataStore/achieve/proBranchAchieve","post",params,"json",function(data){
		if(data.code==1){
			echarts2(type,data);
		}else{
			layer.msg("产品期限分布图加载失败",{icon:5,anim:6,time:3000});
		}
	});
}


/**
 * 产品期限分布图
 * @param type
 * @param data
 * @returns
 */
function echarts1(type,data){

	var cycleNames = [];
	var cycleDatas = [];
	var sumRaiseAmt = 0;
	var realRaiseAmt = 0;
	var productName = '';
	if(data != null){
		sumRaiseAmt = data.data.sumRaiseAmt;//额度
		realRaiseAmt = data.data.realRaiseAmt;//实际认购
		productName = data.data.productName;//产品名称
		
		var dataList = data.data.productStaticlist;
		
		if(dataList != null && dataList.length > 0){
			for(var i = 0; i < dataList.length; i++){
				var obj = new Object();
				obj.name = dataList[i].cycleName;
				if(type == 0){
					obj.value = dataList[i].cycleYear;//年化
				}else if(type == 1){
					obj.value = dataList[i].cycleInvest;//业绩
				}
				cycleDatas[i] = obj;
				cycleNames.push(dataList[i].cycleName);
			}
		}
	}
	
	var dom = document.getElementById("container1");
	var myChart = echarts.init(dom);
	option = null;
	
	option = {
	    title: {
	        text: productName,
	        subtext: '总额度：'+sumRaiseAmt+'万元（实际认购：'+realRaiseAmt+'万元）',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '期限 : {b}<br/>金额 : {c}万元<br/>占比 : {d}%' 
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
	            radius: '55%',
	            center: ['50%', '60%'],
	            data: cycleDatas,
	            itemStyle: {
	                normal: {
	                	color: function(params) {
	                        //自定义颜色
	                        var colorList = ['#61a0a8','#91c7ae','#2f4554','#c23531'];
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

/**
 * 分公司业绩分布图
 * @param type
 * @param data
 * @returns
 */
function echarts2(type,data){	
	var sumRaiseAmt = 0;
	var realRaiseAmt = 0;
	var productName = '';
	var branchOfficeNames = [];
	var colors = [];
	var achievements = [];
	if(data != null){
		sumRaiseAmt = data.data.sumRaiseAmt;//额度
		realRaiseAmt = data.data.realRaiseAmt;//实际认购
		productName = data.data.productName;//产品名称
		
		var dataList = data.data.branchAchieveList;
		
		if(dataList != null && dataList.length > 0){
			for(var i = 0; i < dataList.length; i++){
				branchOfficeNames.push(dataList[i].branchOfficeName);//分公司名称
				colors.push(dataList[i].color);//分公司颜色
				if(type == 0){
					achievements.push(dataList[i].branchProYearAchieve);//年化
				}else if(type == 1){
					achievements.push(dataList[i].branchProInvestAchieve);//业绩
				}
			}
		}
	}
	
	var dom = document.getElementById("container2");
	var e = document.body.clientWidth;//---e/1920*11
	var myChart = echarts.init(dom);
	option = null;
	option = {
            title: {
    	        text: productName,
    	        subtext: '总额度：'+sumRaiseAmt+'万元（实际认购：'+realRaiseAmt+'万元）',
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
		        	return "分公司："+params[0].name+"<br/>认购金额："+params[0].value+"万元";
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
                	name:"单位：万元",
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
                	
                    data: achievements,
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
                        formatter:function(params){
                        	return params.value+'万元'
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
