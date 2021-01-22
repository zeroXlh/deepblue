/**
 * 系统主页js
 */
$(window).resize(function() {
	$("#sidebar").height($(window).height() - $("#navbar").height());
	$("div .tab-pane iframe").height($("#sidebar").height() - 60);
});

$(function() {
 	if ("120.24.144.16" == requestHost) {
//	if ("core.zcthd.com" == requestHost) {
		$('#serverHost').text('正式场');
	} else {
		$('#serverHost').text('测试场');
		
	}
	$("#sidebar").height($(window).height() - $("#navbar").height() - 40);
	loadStaticMenu();
//	loadMenu();

	eval($("#menu_li_00 a").attr("href"));
	
	//设置1秒调用一次show_cur_times函数
	setInterval("show_cur_times()", 1000);
	
//	console.log(menuTree);
});

// 加载菜单树
function loadMenu() {
	menuTree.unshift({
		id : '0',
		text : '首页',
		icon : 'icon-cog',
		url : '',
		menus : [ {
			id : '00',
			text : '首页',
			icon : 'icon-glass',
			close : false,
			url : 'home'
		} ]
	});

	$('#menu').sidebarMenu({
		data : menuTree
	});
}

//登出
function logout() {
	location.replace("/hoper/backweb/logout");
}

//重置参数
function parametersReolad() {
	$.ajax({
		url : weburl + "/parameter/parametersReolad.do",
		data : {
			"loadType" : "ALL",
			"esbFlag" : "Y"
		},
		cache : false,
		async : true,
		dataType : "json",
		success : function(data) {
			if ("SUCC" == data) {
				alert("重置参数成功！");
			} else 
				alert("权限受限！");
		}
	});
}

function openUpdPassDialog() {
	$("#modalLabel").text("密码修改");
	$("#form input").val("");
	$('#modal').modal();
}

function updPassword() {
	if (!$("#form").valid()) {
		return;
	}
	var oldPassVal = $("#oldPassword").val();
	var passVal = $("#password").val();
	var oldPassword = hex_md5(oldPassVal).toUpperCase();
	var password = hex_md5(passVal).toUpperCase();
	jQuery.post("/hoper/backweb/jjsUserBack/updatePassword", {
		"oldPassword" : oldPassword,
		"password" : password
	}, function(data) {
		if (1 == data.code) {
			alert("密码修改成功，请重新登录");
			logout();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var updValidator = $("#form").validate({
	rules : {
		oldPassword : "required",
		password : "required",
		rePassword : {
			"required" : true,
			equalTo : "#password"
		}
	},
	messages : {
		rePassword : {
			required : "必选字段",
			equalTo : "确认密码与密码不一致"
		} 
	}
});

function getQueryString(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var url = decodeURIComponent(window.location.href).split('?');
        var r = url[1].match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    } catch (e) {
        return null;
    }
}

function loadStaticMenu() {
	
	$('#menu').sidebarMenu({
		data : [
			{
				id : '0',
				text : '首页',
				icon : 'icon-cog',
				url : '',
				menus : [ {
					id : '00',
					text : '首页',
					icon : 'icon-glass',
					close : false,
					url : 'home'
				} ]
			}, {
				id : '1',
				text : '舰炮系统',
				icon : 'icon-user',
				url : '',
				menus : [
					{
						id : '1001',
						text : '舰炮管理',
						icon : 'icon-glass',
						url :  '/lone-wolf/web/shipboard'
//					}, {
//						id : '1002',
//						text : '角色管理',
//						icon : 'icon-glass',
//						url :  '/hoper/backweb/user/role'
//					}, {
//						id : '43',
//						text : '权限管理',
//						icon : 'icon-glass',
//						url :  '/hoper/backweb/user/permission'
					} ]
			}
		]
	});
}

function show_cur_times() {
	$("#showtimes").html(dateTimeFormat(new Date()));
}