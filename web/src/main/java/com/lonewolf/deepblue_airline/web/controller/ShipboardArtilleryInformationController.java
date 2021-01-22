package com.lonewolf.deepblue_airline.web.controller;

import java.util.Objects;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.lonewolf.deepblue_airline.web.business.ShipboardArtilleryBusinessService;
import com.lonewolf.deepblue_airline.web.model.ShipboardArtilleryInformation;
import com.lonewolf.deepblue_airline.web.model.auxiliary.Rarity;
import com.lonewolf.deepblue_airline.web.model.extension.ShipboardArtilleryInformationExtension;
import com.lonewolf.deepblue_airline.web.service.ShipboardArtilleryService;
import com.lonewolf.deepblue_airline.web.utils.ResponseCode;
import com.lonewolf.deepblue_airline.web.utils.ResponseData;

/**
 * 表现层控制类
 * 
 * @authoer: pengchao
 * @date: 2018-5-30
 */
@RestController
@RequestMapping("/lone-wolf/shipboard")
public class ShipboardArtilleryInformationController {
	private static final Logger logger = LoggerFactory.getLogger(ShipboardArtilleryInformationController.class);

	@Autowired
	private ShipboardArtilleryBusinessService shipboardArtilleryBusinessService;
	@Autowired
	private ShipboardArtilleryService shipboardArtilleryService;

	/**
	 * 分页舰炮信息
	 * 
	 * @param information
	 * @return
	 */
	@GetMapping("/page")
	public ResponseData<PageInfo<ShipboardArtilleryInformation>> page(ShipboardArtilleryInformation information,
			Integer pageNum, Integer pageSize) {
		logger.info("分页舰炮信息，请求入参：【{}】", information);
		ResponseData<PageInfo<ShipboardArtilleryInformation>> resp = new ResponseData<>(ResponseCode.SUCC);

		try {
			PageInfo<ShipboardArtilleryInformation> pageInfo = shipboardArtilleryService.page(information, pageNum,
					pageSize);

			resp.setData(pageInfo);
		} catch (Exception e) {
			logger.error("分页舰炮信息失败，请求入参：【{}】", information, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	/**
	 * 新增舰炮信息
	 * 
	 * @param information
	 * @return
	 */
	@PostMapping(value = "/add")
	public ResponseData<Boolean> add(ShipboardArtilleryInformationExtension information, HttpSession session) {
		// @RequestParam("file") MultipartFile file,
		logger.info("新增舰炮信息，请求参数：【{}】", information);
		ResponseData<Boolean> resp = new ResponseData<>(ResponseCode.FAIL);

		// 1、参数校验
		// if (Objects.isNull(information.getProductSubjectId())) {
		// resp.setMsg("产品科目不能为空");
		// return resp;
		// }
		try {
			// 1、判断舰炮是否存在
			if (Objects.nonNull(shipboardArtilleryService.selectByUnique(information.getName(),
					Rarity.valueOf((information.getRarity()))))) {
				resp.setMsg("舰炮已存在");
				return resp;
			}
			shipboardArtilleryBusinessService.add(information, information.getShellAttributes());

			// JjsUserBack userMas = (JjsUserBack)
			// session.getAttribute(LoginConstant.SESSION_USER);
			// information.setCreator(userMas.getUserName());

			// 保存图片
			// if (Objects.nonNull(file) && !file.isEmpty())
			// information.setBannerPath(saveBanner(file, subject.getFolderPath(),
			// information.getPeriod())); // 访问绝对路径

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增舰炮信息失败，请求参数：【{}】", information, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

//	private String saveBanner(MultipartFile file, String path, String period) throws IOException {
//		// 保存文件名与期数对应，如：第6期文件名为6.jpg
//		return FilePathUtils.saveFile(file, Paths.get(FilePathUtils.BANNER_PATH.toString(), path),
//				FilePathUtils.getFilename(file, period));
//	}

	@RequestMapping(value = "/hoper/backweb/updateProduct", method = RequestMethod.POST)
	// @Auth("PRODUCT:UPDATE_PRODUCT")
	public ResponseData<String> updateProduct(
			HttpSession session) {
		logger.info("更新产品，参数：[{}]");
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);

		try {
			// ObjectMapper mapper = new ObjectMapper();

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("success");
		} catch (Exception e) {
			logger.error("更新产品失败，jjsProductReq ={}",  e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

}