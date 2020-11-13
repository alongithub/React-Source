import createDOMElement from './createDOMElement';
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

/**
 * @name: 将虚拟dom转换为真实dom并挂载到目标dom内。如果有旧的真实dom，就做对比来更新dom
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM 虚拟dom
 * @param {*} container 转化成真实dom后要挂载到的目标dom
 * @param {*} oldDOM 之前挂载的真实dom，如果存在 进行dom对比，不存在直接挂载
 * @return {*}
 */
export default function diff(virtualDOM, container, oldDOM) {

	// 如果存在 oldDOM ， 取到oldDOM的 虚拟dom，虚拟dom在createDOMElement 函数中挂载到了真实dom 的 _virtralDOM 属性上
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

	const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
	// 判断oldDOM 是否存在
	if (!oldDOM) {
		// 该方法内部会处理 普通html元素，和组件等情况，将转化后的dom挂载到容器上
		mountElement(virtualDOM, container);
	} else if (oldVirtualDOM && virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
		// 如果节点类型不相同，直接替换成新的dom
		const newElement = createDOMElement(virtualDOM);
		oldDOM.parentNode.replaceChild(newElement, oldDOM);
	} else if (typeof virtualDOM.type === 'function') {
		// virtualDOM 为组件的情况
		diffComponent(virtualDOM, oldComponent, oldDOM, container)
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		// 如果 新旧虚拟dom 类型一致
		if (virtualDOM.type === "text") {
			// 更新内容
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
		} else {
			// 更新元素属性
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
		}


		// 【处理key】1、将有key属性的子元素放在对象中
		let keyedElements = {};
		for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
			let domELement = oldDOM.childNodes[i];
			if (domELement.nodeType === 1) {
				// 元素节点才取元素上的key， 文本节点不取
				let key = domELement.getAttribute('key')
				if (key) {
					keyedElements[key] = domELement;
				}
			}
		}



		let notHasKey = Object.keys(keyedElements).length === 0;

		if (notHasKey) { // 如果之前的子元素没有带key的
			// 对比子节点
			virtualDOM.children.forEach((child, i) => {
				diff(child, oldDOM, oldDOM.childNodes[i]);
			})
		} else { // 如果之前的子元素有带key的

			// 【处理key】 2、循环virtualDOM的key属性，
			virtualDOM.children.forEach((child, i) => {
				let key = child.props.key;
				if (key) {
					let domElement = keyedElements[key];
					// 如果期望元素之前存在
					if (domElement) {
						// 【处理key】3、看下当前位置的元素是否是期望元素
						// 如果之前存在期望元素，但是不在目标位置。
						if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
							// 将之前的期望元素domElement插入到目标位置
							oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
						}
					} else {
						// 新增元素
						mountElement(child, oldDOM, oldDOM.childNodes[i]);
					}
				}
			})
		}

		// 删除节点
		let oldChildNodes = oldDOM.childNodes;
		// 判断旧结点数量
		if (oldChildNodes.length > virtualDOM.children.length) {
			if (notHasKey) {

				for (
					let i = oldChildNodes.length - 1;
					i > virtualDOM.children.length - 1;
					i--
				) {
					// 删除节点
					unmountNode(oldChildNodes[i]);
				}

			} else {
				// 通过key删除节点
				for (let i = 0; i < oldChildNodes.length; i ++) {
					let oldChild = oldChildNodes[i];
					let oldChildKey = oldChild._virtualDOM.props.key;
					let isFound = false;
					for (let n = 0; n < virtualDOM.children.length; n ++) {
						if (oldChildKey === virtualDOM.children[n].props.key) {
							isFound = true;
							break;
						}
					}
					if (!isFound) {
						unmountNode(oldChild);
					}
				}
			}
			
			
		}
	}
}