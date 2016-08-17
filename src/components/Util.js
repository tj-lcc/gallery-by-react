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
}

export default Util;