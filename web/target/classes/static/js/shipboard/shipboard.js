/**
 * 
 */
$(function () {
	pcg_fun.loadCommonData("#scale_q", scaleCombo, "value", "text", null);
	pcg_fun.loadCommonData("#ammunition_q", ammunitionCombo, "value", "text", null);
	pcg_fun.loadCommonData("#reformatory_q", booleanCombo, "value", "text", null);
	loadTable();
	
//	openDialog();
//	jQuery.get("/hoper/backweb/productSubjectList", {
//		
//	}, function(data) {
//    	if (1 == data.code) {
//    		$("#productSubjectId").empty();
//    		$("#productSubjectIdQuery").empty();
//    		var v = data.data;
//    		var options = "<option value='' selected='selected'>---请选择---</option>";
//    		for(var i = 0;i < v.length;i++){
//    			options += "<option value='" + v[i]["id"]+ "'>" + v[i]["productName"] + "</option>";
//    		}
//    		$("#productSubjectId").html(options);
//    		$("#productSubjectIdQuery").html(options);
//    		
//    		if (!pcg_fun.isEmpty(productSubjectIdParam)) {
//    			$("#productSubjectIdQuery").val(productSubjectIdParam);
//    			$("#productSubjectIdQuery").attr("disabled", true);
//    			$("#reback").show();
//    			search();
//    		}
//    	} else {
//    		alert("加载产品科目下拉框参数失败");
//    	}
//    },"json");
	
//	jQuery.get("/hoper/backweb/jjsPaymentAccount/getAccounts", {
//		
//	}, function(data) {
//    	if (1 == data.code) {
//    		$("#paymentAccount").empty();
//    		var v = data.data;
//    		var options = "<option value='' selected='selected'>---请选择---</option>";
//    		for(var i = 0;i < v.length;i++){
//    			options += "<option value='" + v[i]["accountCode"]+ "'>" + v[i]["bankInfo"] + "-" + v[i]["bankCode"] + "</option>";
//    		}
//    		$("#paymentAccount").html(options);
//    	} else {
//    		alert("加载打款账户信息失败");
//    	}
//    },"json");
	
//	pcg_fun.loadCommonData("#statusQuery", statusCommonJson, "value", "text");
});

var columns = [
     {
         field: 'shellCode',
         title: '舰炮编号',
         align : "center"
     },
	{
    	field: 'name',
    	title: '舰炮名称',
    	align : "center" ,
	}, {
		field: 'rarity',
		title: '稀有度',
		align : "center"
//    	formatter : financeFormat
    }, {
        field: 'scale',
        title: '规模',
        align : "center",
        formatter : scaleFormat
    }, {
        field: 'damage',
        title: '伤害',
    	align : "center",
    	formatter : danageFormat
    }, {
    	field: 'firingRate',
    	title: '标准射速',
    	align : "center",
    	formatter : firingRateFormat
    }, {
    	field: 'cannonry',
    	title: '炮击',
    	align : "center"
    }, {
    	field: 'ammunition',
    	title: '炮弹',
    	align : "center",
    	formatter : ammunitionFormat
    }, {
    	field: 'reformatory',
    	title: '可改造',
    	align : "center",
    	formatter : reformatoryFormat
    }, {
    	field: 'enhancedUpperLimit',
    	title: '强化上限',
    	align : "center"
    }, {
    	field: 'apply',
    	title: '适用舰种',
    	align : "center"
    }, {
    	field: 'wayOfGain',
    	title: '获得方式',
    	align : "center"
    }, {
    	field: 'void',
    	title: '操作',
    	align : "center",
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#tb').bootstrapTable({
		url : "/lone-wolf/web/shipboard/page",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
	$(function(){
		$("#tb tr").click(function(){
			$("#tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function search_shipboard() {
	var options = $("#tb").bootstrapTable('getOptions');
	var params = queryParams(options);
//	if (!pcg_fun.isEmpty(productSubjectIdParam))
//		params.productSubjectId = productSubjectIdParam;
	$("#tb").bootstrapTable('refresh', {query : params});
}

//var checkUpd = checkAuth("PRODUCT:UPDATE_PRODUCT");
//var checkPutOn = checkAuth("PRODUCT:PUTON_PRODUCT");
//var checkPullOff = checkAuth("PRODUCT:PULLOFF_PRODUCT");
function operateFormat(value, row, index) {
	var s = '';
	// 上架
//    if (checkPutOn){
//        if(row.websiteDisplay == 'N' &&  row.platformDisplay == 'N'){
//        s += '<button type="button" class="btn btn-success btn-sm" onClick="putOnProduct(\''
//            + row.id  + '\')">上架</button>&nbsp;';
//        }
//	}
//	//下架
//    if (checkPullOff){
//    	if(row.websiteDisplay == 'Y' &&  row.platformDisplay == 'Y'){
//            s += '<button type="button" class="btn btn-danger btn-sm" onClick="pullOffProduct(\''
//                + row.id  + '\')">下架</button>&nbsp;';
//		}
//    }
//
//    // 修改
//    if (checkUpd){
//        s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
//            + row.id + '\')">修改</button>&nbsp;';
//    }
//
//	// 查看banner图片
//	if (!pcg_fun.isEmpty(row.bannerPath))
//		s += '<button type="button" class="btn btn-info btn-sm" onClick="viewBanner(\''
//			+ row.bannerPath + '\')">Banner</button>';
	return s;
}

function formReset() {
	$("#product_form input").val("");
}

function viewBanner(bannerPath) {
	window.open(bannerPath);
}

function openDialog() {
	$("#product_form input").val("");
	$("#product_form select").val("");
	$("#product_form textarea").val("");
	$("#deadlineType").val(0);
	validator.resetForm();
	
	$("#productSubjectId").attr("disabled", false);
	$("#period").attr("disabled", false);
	$("#raiseBeginTime").attr("disabled", false);
	$("#raiseEndTime").attr("disabled", false);
	
	$("#myModalLabel").text("新增舰炮信息");
	$('#productModal').modal();
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/getProduct", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#product_form input").val("");
			$("#product_form textarea").val("");
			
			$("#productSubjectId").attr("disabled", true);
			$("#period").attr("disabled", true);
			$("#raiseBeginTime").attr("disabled", true);
			if (!pcg_fun.isEmpty(data.data.raiseEndTime))
				$("#raiseEndTime").attr("disabled", true);
			else
				$("#raiseEndTime").attr("disabled", false);
			
			data.data.annualizedIncome = (data.data.annualizedIncome * 100).toFixed();
			
			$("#product_form").populateForm(data.data);
			$("#myModalLabel").text("修改产品");
			$('#productModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function loadData() {
	$("#product_form").populateForm({
		"name" : "203mm连装炮T3",
		"scale" : "S",
		"hitCardinal" : "26",
		"hitInstance" : "4",
		"firingRate" : "8.85",
		"cannonry" : "25",
		"ammunition" : "HE",
		"reformatory" : "1",
		"rarity" : "CRA",
		"cannonry" : "25",
		"enhancedUpperLimit" : "10",
		"shellAttributes.flightSpeed" : "16",
		"shellAttributes.lightArmorRatio" : "135",
		"shellAttributes.mediumArmorRatio" : "95",
		"shellAttributes.heavyArmorRatio" : "70",
		"shellAttributes.spottingScope" : "70",
		"shellAttributes.spottingAngle" : "40",
		"shellAttributes.rangeMin" : "40",
		"shellAttributes.rangeMax" : "60",
		"shellAttributes.intersperseAngle" : "12",
		"shellAttributes.camp" : "ZY",
		"shellAttributes.amendRatio" : "110",
		"shellAttributes.damageType" : "炮击",
		"shellAttributes.attributeEfficiency" : "100"
	});
}

function save_shipboard() {
	if (!$("#product_form").valid()) {
		return;
	}
	var json = $("#product_form").serializeJson();
//	var fileVal = $("#file").val();
	var url =  "";
	if (pcg_fun.isEmpty(json.shellCode)) {
		url = "/lone-wolf/web/shipboard/add";
//		if (pcg_fun.isEmpty(fileVal)) {
//			alert("banner图片不能为空");
//			return;
//		}
	} else {
		url = "/lone-wolf/web/shipboard/update";
	}
//	json.annualizedIncome = (json.annualizedIncome / 100).toFixed(2, 10) ;
	
	$("#save_bt").attr("disabled", true);
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$('#productModal').modal('hide');
			$("#tb").bootstrapTable('refresh');
			alert(data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
	
//	 $.ajaxFileUpload({
//		 url : url,
//		 type : 'post',
//		 secureuri : false, // 一般设置为false
//		 fileElementId : 'file', // 上传文件的id、name属性名
//		 dataType : 'json', // 返回值类型，一般设置为json、application/json
//		 data : json,
//		 success : function(data, status) {
//			 $("#save_bt").attr("disabled", false);
//			 if (1 == data.code) {
//				$('#productModal').modal('hide');
//				$("#tb").bootstrapTable('refresh');
//				alert("success");
//			 } else if (0 == data.code) {
//				 alert(data.msg);
//			 } else {
//				 alert(data);
//			 }
//		 },
//		 error : function(data, status, e) {
//			 $("#save_bt").attr("disabled", false);
//			 alert(e);
//		}
//	});
	
//	myAjaxPost(url, JSON.stringify(json), function(data) {
//		if (1 == data.code) {
//			alert("success");
//			$('#productModal').modal('hide');
//			$("#tb").bootstrapTable('refresh');
//		} else if (0 == data.code) {
//			alert(data.msg);
//		} else {
//			alert(data);
//		}
//	});
}

var validator = $("#product_form").validate({
	ignore: "",
	rules : {
		productSubjectId : "required",
		productDeadline : {
			required : true,
			positive : true
		},
		deadlineType : "required",
		period : {
			"required" : true
		},
		currentRaiseAmt : {
			"required" : true,
			number : true
		},
		beginAmt : {
			"required" : true,
			number : true
		},
		addAmt : {
			"required" : true,
			number : true
		},
		annualizedIncome : {
			"required" : true,
			positive : true
		},
		payType : "required",
		color : {
			//"required" : true,
			utfmaxlength : 50
		},
		paymentAccount : "required",
		websiteDisplay : "required",
		platformDisplay : "required",
		raiseBeginTime : "required"
	}
});

var statusCommonJson = [
	{"value" : 0, "text" : "待募集"},
	{"value" : 1, "text" : "募集中"},
	{"value" : 2, "text" : "已起息"},
	{"value" : 3, "text" : "已完成"},
];
var statusFormatJson = {
	0 : "待募集",
	1 : "募集中",
	2 : "已起息",
	3 : "已完成"
};

function danageFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var rs = "";
	return rs.concat(row.hitCardinal, "*", row.hitInstance, "(", value, ")");
}

function reformatoryFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return value ? "是" : "否";
}

var ammunitionFormatJson = {
	"NA":"通常弹","AP":"穿甲弹","HE":"高爆弹","OT":"其它"	
};
function ammunitionFormat(value, row, index) {
//	if (pcg_fun.isEmpty(value))
//		return "-";
//	var rs = ammunitionFormatJson[value];
//	return pcg_fun.isEmpty(rs) ? value : rs;
	return commonFormat(value, ammunitionFormatJson);
}
var scaleFormatJson = {
		"S":"小型","M":"中型","L":"大型"	
};
function scaleFormat(value, row, index) {
	return commonFormat(value, scaleFormatJson);
}

function firingRateFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return value + "s/轮";
}

//function reBack() {
//	refreshto("/hoper/backweb/product/productSubject");
//}

var scaleCombo = [
	{"value" : "S", "text" : "小型"},
	{"value" : "M", "text" : "中型"},
	{"value" : "L", "text" : "大型"}
	];

var ammunitionCombo = [
	{"value" : "NA", "text" : "通常弹"},
	{"value" : "AP", "text" : "穿甲弹"},
	{"value" : "HE", "text" : "高爆弹"},
	{"value" : "OT", "text" : "其它"}
	];
