import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

/**
 * @name: 处理普通html'标签
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM 虚拟dom
 * @param {*} container 父节点dom
 * @return {*}
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
	let newElement = createDOMElement(virtualDOM);

	// 判断旧的DOM对象是否存在 如果存在,将新dom插入之前，并删除旧dom
	if(oldDOM) {
		// container.insertBefore(newElement, oldDOM);
		// unmountNode(oldDOM);
		container.replaceChild(newElement, oldDOM)
	} else {
		// 将virtral转换后的真实dom挂载到父容器
		container.appendChild(newElement);
	}

	


	let component = virtualDOM.component;
	// 至于类组件返回的virtualDOM 上才挂在了component实例
	if (component) {
		component.setDOM(newElement);
	}
}