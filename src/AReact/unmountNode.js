/**
 * @name: 删除节点
 * @test: test font
 * @msg: 
 * @param {*} node
 * @return {*}
 */
export default function unmountNode(node) {
	// 获取节点的virtualDOM 对象
	const virtualDOM = node._virtualDOM;
	// 1. 文本节点可以直接删除
	if (virtualDOM.type === 'text') {
		node.remove();
		return;
	}
	// 【元素节点】

	// 2. 看下节点是否由组件生成
	let component = virtualDOM.component;
	// 如果存在说明是由组件生成
	if (component) {
		component.componentWillUnmount();
	}

	// 3.查看节点是否有ref属性，如果有，卸载后应该清理掉父节点实例上的该节点的引用
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null);
	}

	// 4.判断节点是否有时间属性，如果有，删除掉对应的事件 // TODO 【why】 这里为什么要删除事件
	Object.keys(virtualDOM.props).forEach(propName => {
		if (propName.slice(0, 2) === 'on') {
			const eventName = propName.toLowerCase().slice(0, 2);
			const eventHandler = virtualDOM.props[propName];
			node.removeEventListener(eventName, eventHandler);
		}
	})

	// 递归删除子节点
	if (node.childNodes.length > 0) {
		for (let i = 0; i < node.childNodes.length; i ++) {
			unmountNode(node.childNodes[i]);
			i --;
		}
	}

	// 删除节点
	node.remove();
}