import isFunction from './isFunction';

/**
 * @name: 判断组件是函数组件还是类组件
 * @test: test font
 * @msg: 返回是不是函数组件
 * @param {*}
 * @return {*}
 */
export default function isFunctionComponent(virtualDOM) {
	const type = virtualDOM.type;
	return (type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render))
}