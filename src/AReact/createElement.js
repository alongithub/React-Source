/**
 * @name: 创建返回节点虚拟dom
 * @test: test font
 * @msg: 
 * @param {*} type 节点类型
 * @param {*} props 属性
 * @param {array} children 子节点
 * @return {*}
 */
export default function createElement (type, props, ...children) {

	// 1、处理文本节点，jsx 文本节点会直接返回文本，
	// 需要处理成，{type: 'text', props: {textContent: '文本内容'}}
	// 2、另外需要处理 false 节点。
	// 2 === 1 && <div>假如 2 === 1 这里会被渲染</div> 会被处理成 false: Boolean
	const childElements = [].concat(...children).reduce((result, child) => {
		if (child !== false && child !== true && child !== null) {
			if (child instanceof Object) {
				result.push(child);
			} else {
				result.push( createElement("text", { textContent: child }) );
			}
		}
		return result;
	}, [])


	return {
		type,
		// 处理 组件可以通过props.childrend 拿到子节点
		props: Object.assign({children: childElements}, props),
		children: childElements
	}
}