package com.lonewolf.deepblue_airline.web.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lonewolf.deepblue_airline.web.model.User;
import com.lonewolf.deepblue_airline.web.utils.LoginConstant;
import com.lonewolf.deepblue_airline.web.utils.Md5Utils;
import com.lonewolf.deepblue_airline.web.utils.ResponseCode;
import com.lonewolf.deepblue_airline.web.utils.ResponseData;
import com.lonewolf.deepblue_airline.web.utils.lang.StringUtils;

@RestController("backwebLoginController")
@RequestMapping(value = "/lone-wolf/web/auxiliary")
public class LoginController {
	private static Logger logger = LoggerFactory.getLogger(LoginController.class);

//	@Autowired
//	private JjsUserBackService jjsUserBackService;
//	@Autowired
//	private LoginService loginService;

	/**
	 * 后台登陆
	 * 
	 * @param userName
	 *            用户名
	 * @param password
	 *            密码（MD5加密）
	 * @return
	 */
	@PostMapping("/login")
	public ResponseData<String> login(String userName, String password, HttpSession session) {
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		logger.info("用户登录后台系统，userName：[{}]，password：[{}]", userName, password);
		// 参数校验
		if (StringUtils.isBlank(userName) || StringUtils.isBlank(password)) {
			resp.setMsg("用户名或密码为空");
			return resp;
		}
		try {
			// MD5加密密码
			// String encode = MD5Utils.encode("admin123");

//			JjsUserBack jjsUserBack = jjsUserBackService.getByUserName(userName);
//			if (Objects.isNull(jjsUserBack)) {
//				// 用户不存在
//				logger.warn("用户登录失败，用户不存在，userName={}", userName);
//				resp.setMsg("用户不存在");
//				return resp;
//			}
			// 校验用户名与密码
			if (!"admin".equals(userName)) {
				logger.warn("用户登录失败，用户不存在，userName={}", userName);
				resp.setMsg("用户不存在");
				return resp;
			}
			User user = new User("admin");
			if (!Md5Utils.md5Hex("admin123").equals(password)) {
				logger.warn("用户登录失败，密码错误，userName={}", userName);
				resp.setMsg("用户名或密码输入错误");
				return resp;
			}

//			if (StatusEnums.DISA == StatusEnums.valueOf(jjsUserBack.getStatus())) {
//				// 已注销
//				logger.warn("用户登录失败，用户已注销，userName={}", userName);
//				resp.setMsg("用户已注销");
//				return resp;
//			}
			// 设置用户登录session
			new ObjectMapper();
			session.setAttribute(LoginConstant.SESSION_USER, user);
			session.setAttribute("currentDate", LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE));

			// 保存用户的菜单权限树
//			List<MenuTree> menuTree = loginService.menuTree(jjsUserBack.getId());
//			session.setAttribute(LoginConstant.SESSION_MENU_TREE, menuTree);

			// 保存用户的菜单auth权限集
//			Set<String> auth = loginService.auth(jjsUserBack.getId());
//			session.setAttribute(LoginConstant.SESSION_AUTH_PERMISSION, auth);
			
			// session.setMaxInactiveInterval(0); // 测试阶段使会话永远不失效
			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("用户登录后台系统失败，userName：[{}]，password：[{}]", userName, password, e);
			resp.setMsg("登录失败");
		}
		return resp;
	}

	/**
	 * 后台退出
	 * 
	 * @param session
	 * @return
	 */
	@GetMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		logger.info("用户退出系统，用户：【{}】", session.getAttribute(LoginConstant.SESSION_USER));
		try {
			session.invalidate(); // 废除session
			// request.getRequestDispatcher("/hoper/backweb/index").forward(request,
			// response); // 转发
			response.sendRedirect("/lone-wolf/web/index"); // 重定向
		} catch (IOException e) {
			logger.error("用户退出跳转登录页面失败", e);
		}
	}

}

