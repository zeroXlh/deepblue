/**
 * 
 */
$(function() {
	loadProductSubjectByData("#productSubjectIdQuery");  //加载产品下拉列表

    $("#timeEnd").val(new Date().format("yyyy-MM-dd"));
    var defaultEndDate = new Date();
    defaultEndDate.setDate(new Date().getDate() - 7);
    $("#timeBegin").val(defaultEndDate.format("yyyy-MM-dd"));

	$("#productSubjectIdQuery").change(function() {
		var subjectId = $("#productSubjectIdQuery").val();
		if (pcg_fun.isEmpty(subjectId)) {
			//$("#product_id_query").empty();
			return;
		}
		//loadProduct("#product_id_query", {"productSubjectId" : subjectId});
	});
	loadMainTable();
});


function loadMainTable() {
    var json = $("#query_form").serializeJson();

	$('#product_order_list').bootstrapTable({
		url : "/hoper/backweb/marketing/query",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: false, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        clickToSelect : true,
        singleSelect : true,
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: json,//设置查询时候的参数，传递参数（*）
        columns: columns,
        showFooter : true,
        responseHandler: nonPageHandler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
	$(function(){
		$("#pro_sub_order_list tr").click(function(){
			$("#pro_sub_order_list tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});

	//产品项目统计
	$('#product_subject_list').bootstrapTable({
		url : "/hoper/backweb/marketing/productSubjectQuery",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: false, //启动分页
        paginationShowPageGo: false,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 50, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        clickToSelect : true,
        singleSelect : true,
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: json,//设置查询时候的参数，传递参数（*）
        columns: productSubjectColumns,
        showFooter : false,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	
	
}
var columns = [
	{
		field : "branchOfficeName",
		title : "分公司名称",
		align : "center"
	}, {
		field : "branchInvestAchieve",
		title : "募集额（万元）",
		align : "center",
		formatter : financeFormat
	},
	{
		field : "branchInvestRate",
		title : "占比",
		align : "center",
		 footerFormatter: function (data) {
            return "合计入金：";
        }
	},
	{
		field : "branchInvestAchieveThree",
		title : "三个月产品募集额（万元）",
		align : "center",
		formatter : financeFormat,
		footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["branchInvestAchieveThree"];
            }
            return financeFormat(count);
        }
	},
	{
		field : "branchInvestAchieveSix",
		title : "六个月产品募集额（万元）",
		align : "center",
		formatter : financeFormat,
		footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["branchInvestAchieveSix"];
            }
            return financeFormat(count);
        }
	},
	{
		field : "branchInvestAchieveTwe",
		title : "十二个月产品募集额（万元）",
		align : "center",
		formatter : financeFormat,
		footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["branchInvestAchieveTwe"];
            }
            return financeFormat(count);
        }
	},
	{
		field : "branchInvestAchieveTwenFour",
		title : "二四个月产品募集额（万元）",
		align : "center",
		formatter : financeFormat,
		footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["branchInvestAchieveTwenFour"];
            }
            return financeFormat(count);
        }
	}
];

var productSubjectColumns = [
   	{
   		field : "productName",
   		title : "产品名称",
   		align : "center",
   		formatter : periodFormat
   	}, {
   		field : "productInvest",
   		title : "募集额度(万元)",
   		align : "center",
   		formatter : financeFormat
   	},
   	{
   		field : "productRate",
   		title : "占比",
   		align : "center",
   		formatter : financeFormat
   	}
   ];

//点击查询按钮触发
function productStatisticsSearch(id) {
	loadMainTable();
	
	var options = $(id).bootstrapTable('getOptions');
	
	var json = $("#query_form").serializeJson();
	
	$(id).bootstrapTable('refreshOptions', {queryParams:json});
	$("#product_subject_list").bootstrapTable('refreshOptions',{queryParams:json});
	
	periodInvest();
	
	
}


function periodFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = productSubjectMapping[row.productSubjectId];
	return (pcg_fun.isEmpty(val) ? "" : val) + value + "";
}

function periodInvest() {
	var json = $("#query_form").serializeJson();
	$.ajax({
		type: "post",
		dataType: "json",
		url: '/hoper/backweb/marketing/periodInvestQuery',
		data: json,
		success: function (data) {
		if (data != "") {
			console.info(data);
			 $("#periodInvest").html(data.data);
		  }
		}
		    });
	
}