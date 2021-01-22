package com.lonewolf.deepblue_airline.web.interceper;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.lonewolf.deepblue_airline.web.utils.LoginConstant;

public class BackSessionInterceptor implements HandlerInterceptor {
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(BackSessionInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// String url = request.getRequestURI();
		HttpSession session = request.getSession();

		if (Objects.isNull(session.getAttribute(LoginConstant.SESSION_USER))) {
			String header = request.getHeader("X-Requested-With");
			if ("XMLHttpRequest".equals(header)) {
				response.setHeader("sessionStatus", "timeout");
				response.setStatus(200);
				response.setContentType("application/json;charset=UTF-8");
				response.getWriter().write("{\"code\": 0,\"msg\":\"登录session已过期\"}");
			} else {
				response.setContentType("text/html;charset=utf-8");
				response.sendRedirect(request.getContextPath() + "/hoper/backweb/index");
			}

			return false;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}
