/**
 * @name: 更新真实dom与virtualDOM.props相关的内容
 * @test: test font
 * @msg: 
 * @param {*} newElement
 * @param {*} virtualDOM
 * @return {*}
 */
export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
	const newProps = virtualDOM.props;
	const oldProps = oldVirtualDOM.props || {};
	Object.keys(newProps).forEach(propName => {
		const newPropValue = newProps[propName];
		const oldPropsValue = oldProps[propName];
		if (newPropValue !== oldPropsValue) {

			// 判断属性是否是 绑定事件的属性 如 onClick
			if (propName.slice(0, 2) === 'on') {
				const eventName = propName.toLowerCase().slice(2); // 转化属性名为小写并截取on之后的字符 onClick -> click
				// 监听事件
				newElement.addEventListener(eventName, newPropValue);

				// 删除原有的事件处理函数
				if (oldPropsValue) {
					newElement.removeEventListener(eventName, oldPropsValue);
				}
			} else if (propName === 'value' || propName === 'checked') {
				newElement[propName] = newPropValue;
			} else if (propName !== 'children') {
				if (propName === 'className') {
					newElement.setAttribute('class', newPropValue);
				} else {
					newElement.setAttribute(propName, newPropValue);
				}
			}
		}


	})

	// 判断属性被删除的情况
	Object.keys(oldProps).forEach(propName => {
		const newPropsValue = newProps[propName];
		const oldPropsValue = oldProps[propName];
		if (!newPropsValue) {
			// 属性被删除了
			if (propName.slice(0, 2) === 'on') {
				// 移除之前的事件
				const eventName = propName.toLowerCase().slice(2);
				newElement.removeEventListener(eventName, oldPropsValue)
			} else if (propName !== 'children') {
				// removeAttribute 可以 移除包括value和checked属性，所以不用单独考虑
				newElement.removeAttribute(propName);
			}
		}
	})

}