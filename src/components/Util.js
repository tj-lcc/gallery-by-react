/**
 * 创建工具类
 */

class Util {
	/**
	 * 生成图片的路径
	 * @param  {[Array]} imageDataArr [description]
	 */
	static generateImageURL(imageDataArr) {
		for(let imageData of imageDataArr) {
			imageData.url = require('../images/'+imageData.fileName);
		}
	}

	// 获取区间内随机数
	static getRangeRandom(low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	}

	// 获取角度, [-30, 0), (0, 30]
	static getRandomDeg() {
		return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
	}
}

export default Util;