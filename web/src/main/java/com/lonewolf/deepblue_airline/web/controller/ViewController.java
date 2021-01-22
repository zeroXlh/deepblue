package com.lonewolf.deepblue_airline.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/lone-wolf/web")
public class ViewController {

	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(ViewController.class);

	/**
	 * 后台主页
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/main")
	public String main(Model model, HttpServletRequest request) {
		String serverName = request.getServerName();
		model.addAttribute("requestHost", serverName);
		return "main";
	}

	@RequestMapping("/include")
	public String include(Model model, HttpServletRequest request) {
		return "include";
	}

	/**
	 * 欢迎页
	 * 
	 * @return
	 */
	@RequestMapping("/home")
	public String home() {
		return "home";
	}

	/**
	 * 登录页
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	/**
	 * 产品管理主页
	 * 
	 * @return
	 */
	@RequestMapping("/shipboard")
	public ModelAndView productPage() {
		ModelAndView modelAndView = new ModelAndView("shipboard/shipboard");
		return modelAndView;
	}

}
