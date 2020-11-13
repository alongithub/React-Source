/**
 * @name: 区分组件和普通html元素
 * @test: test font
 * @msg: 
 * @param {*}
 * @return {*}
 */
export default function isFunction(virtualDOM) {
	return virtualDOM && typeof virtualDOM.type === "function"
}