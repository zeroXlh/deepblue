//package com.lonewolf.deepblue_airline.web.interceper;
//
//import java.util.Set;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.method.HandlerMethod;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
///**
// * Auth权限拦截器
// * 
// * @author Administrator
// *
// */
//public class AuthInterceptor implements HandlerInterceptor {
//
//	private static Logger logger = LoggerFactory.getLogger(AuthInterceptor.class);
//
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		HttpSession session = request.getSession();
//		JjsUserBack jjsUserBack = (JjsUserBack) session.getAttribute(LoginConstant.SESSION_USER);
//		logger.info("auth权限拦截器，METHOD：[{}],请求者：[{}]", request.getRequestURI(), jjsUserBack.getUserName());
//		// ，请求参数：[{}]
//		if (handler instanceof HandlerMethod) {
//			HandlerMethod method = (HandlerMethod) handler;
//
//			// 访问方法存在Auth注解，判断用户是否存在此权限
//			if (method.hasMethodAnnotation(Auth.class)) {
//				Auth auth = method.getMethodAnnotation(Auth.class);
//				String[] value = auth.value();
//
//				@SuppressWarnings("unchecked")
//				Set<String> attribute = (Set<String>) session.getAttribute(LoginConstant.SESSION_AUTH_PERMISSION);
//
//				for (String str : value) {
//					// 用户不存在此操作权限，写入响应信息返回false
//					if (!attribute.contains(str)) {
//						response.setContentType("application/json;charset=UTF-8");
//						response.getWriter().write("{\"code\":0,\"msg\":\"权限受限！\"}");
//						return false;
//					}
//				}
//			}
//		}
//		return true;
//	}
//
//	@Override
//	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//			ModelAndView modelAndView) throws Exception {
//
//	}
//
//	@Override
//	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
//			throws Exception {
//
//	}
//
//}
