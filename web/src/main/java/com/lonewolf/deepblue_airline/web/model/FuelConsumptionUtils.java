package com.lonewolf.deepblue_airline.web.model;

public class FuelConsumptionUtils {
	public static int consume(int grade, int finalConsume, int t) {
		// 水面舰船出击油耗(结果去尾) = 1 + (最终油耗-未突破次数*2) * 等级系数
		// 潜艇舰船出击油耗(结果去尾) = 0 + (最终油耗+1-未突破次数*1) * 等级系数
		// 0.5+Math.min(等级,99)*0.005
		return (int) Math.floor(1 + (finalConsume - (3 - t) * 2) * coefficientOfGrade(grade));

	}

	private static double coefficientOfGrade(int grade) {
		return 0.5 + Math.min(grade, 99) * 0.005;
	}

	public static void main(String[] args) {
		printCalu("白轻航", 9);
		printCalu("紫驱逐", 9);
		
		
		printCalu("紫轻巡", 10);

		// System.out.println("===========紫轻巡============");
		// System.out.printf("紫轻巡 %d 级消耗变为 %d\n", 1, consume(1, 10, 0));
		// System.out.printf("紫轻巡 %d 级消耗变为 %d\n", 50, consume(50, 10, 0));
		//
		// System.out.println("===========紫战列============");
		// System.out.printf("战列 %d 级消耗变为 %d\n", 1, consume(1, 14, 0));
		// System.out.printf("战列 %d 级消耗变为 %d\n", 25, consume(25, 14, 0));
		// System.out.printf("战列 %d 级消耗变为 %d\n", 50, consume(50, 14, 0));
		// System.out.printf("战列 %d 级消耗变为 %d\n", 75, consume(75, 14, 0));
		// // System.out.println(consume(75,14,0));
		//
		// System.out.println("===========紫战巡============");
		// System.out.printf("战巡 %d 级消耗变为 %d\n", 1, consume(1, 13, 0));
		// System.out.printf("战巡 %d 级消耗变为 %d\n", 15, consume(15, 13, 0));
		// System.out.printf("战巡 %d 级消耗变为 %d\n", 43, consume(43, 13, 0));
		// System.out.printf("战巡 %d 级消耗变为 %d\n", 72, consume(72, 13, 0));
		// System.out.println("===========紫重炮============");
		//
		// System.out.printf("紫重炮 %d 级消耗变为 %d\n", 1, consume(1, 10, 0));
		// System.out.printf("紫重炮%d 级消耗变为 %d\n", 15, consume(50, 10, 0));
		//
		// System.out.printf("白轻航 %d 级消耗变为 %d\n", 1, consume(1, 10, 0));
		// System.out.printf("白轻航%d 级消耗变为 %d\n", 15, consume(50, 10, 0));

	}

	private static void printCalu(String type, int finalConsume) {
		// int g = 1; // 等级
		// int t = 0; // 突破次数
		for (int t = 0; t <= 3; t++) {
			int g = 1;
			if (t == 1)
				g = 10;
			else if (t == 2)
				g = 30;
			else if (t == 3)
				g = 70;
			for (int rs = 1, r = 0; g <= 100; g++) {
				r = consume(g, finalConsume, t);
				if (r > rs) {
					rs = r;
					System.out.printf("%s %d 破 %d 级消耗变为 %d\n", type, t, g, rs);
				}
			}

		}
	}

}
