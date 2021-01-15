/**
 * 
 */

//
$(function() {
	loadProductCustomer("#product");
	loadTable();
});

var columns = [ {
	field : 'orderNo',
	title : '订单编号',
	align : "center"
}, {
	field : 'custName',
	title : '客户名称',
	align : "center"
}, {
	field : 'certNo',
	title : '客户身份证号',
	align : "center"
}, {
	field : 'bankNo',
	title : '银行卡号',
	align : "center"
//}, {
//	field : 'status',
//	title : '请求状态',
//	align : "center",
//	formatter : statusFormat
}, {
	field : 'result',
	title : '认证结果',
	align : "center"
// formatter : resultFormat
}, {
	field : 'resultExplanation',
	title : '认证结果描述',
	align : "center"
}, {
	field : 'charge',
	title : '是否收费',
	align : "center",
	formatter : chargeFormat
}, {
	field : 'requestTime',
	title : '请求时间',
	align : "center",
	formatter : jsonTimeFormat
}, {
	field : 'responseData',
	title : '响应信息',
	align : "center"
} ];

function loadTable() {
	$('#auth_log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsAuthLog/page",
		dataType : "json",
		method : "GET",
		striped : true,// 是否显示行间隔色
		cache : false,
		sidePagination : "server",// 分页方式：client客户端分页，server服务端分页（*）
		pagination : true, // 启动分页
		paginationShowPageGo : true,// 页码跳转
		sortable : true,// 排序
		pageNumber : 1, // 当前第几页
		pageSize : 10, // 每页显示的记录数
		clickToSelect : true,
        singleSelect : true,
		showPaginationSwitch : false,// 展示页数的选择
		pageList : [ 10, 25, 50, 100 ],// 记录数可选列表
		contentType : 'application/json;charset=UTF-8',
		queryParamsType : '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
		queryParams : queryParams,// 设置查询时候的参数，传递参数（*）
		columns : columns,
		onClickRow : recordRow,
		onLoadSuccess : discolor,
		responseHandler : handler
	// 在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
	});
}
function discolor() {
	// 表格变色
	$("#auth_log_tb tr").click(function() {
		$("#auth_log_tb tr").css("background", "#fff");
		$(this).css("background", "#B4E4E9");
	})
}

var reAuthRow = undefined;
function recordRow(row, ele, field) {
	reAuthRow = row;
}

function reAuth() {
//	var selections = $('#auth_log_tb').bootstrapTable("getSelections");
	if (pcg_fun.isEmpty(reAuthRow)) {
		alert("请先选择需重新认证的记录！");
		return;
	}
	if ("01" == reAuthRow.result) {
		alert("该记录已认证成功，无需再次认证！");
		return;
	}
	$("#re_auth_bt").attr("disabled", true);
	jQuery.post("/hoper/backweb/jjsAuthLog/reAuth", {
		"id" : reAuthRow.id
	}, function(data) {
		$("#re_auth_bt").attr("disabled", false);
		if (1 == data.code) {
			reAuthRow = undefined;
			$("#auth_log_tb").bootstrapTable('refresh');
			alert("认证完成");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, 'json');
}

var resultFormatJson = {
	"01" : "认证一致",
	"02" : "认证不一致",
	"03" : "认证不确定",
	"04" : "认证失败"
}
function resultFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = resultFormatJson[value];
	if (pcg_fun.isEmpty(val))
		return value;
	return val;
}

function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return "SUCC" == value ? "请求成功" : "FAIL" == value ? "请求失败" : value;
}

function chargeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return "Y" == value ? "收费" : "N" == value ? "不收费" : value;
}
