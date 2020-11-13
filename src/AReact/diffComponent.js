import mountElement from "./mountElement";
import updateComponent from './updateComponent';
/**
 * @name: diff 组件
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM 最新的虚拟dom
 * @param {*} oldComponent 之前的组件实例
 * @param {*} oldDOM 之前的真实dom
 * @param {*} container 容器
 * @return {*}
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
	if (isSaveComponent(virtualDOM, oldComponent)) {
		// 同一组件，进行组件更新
		updateComponent(virtualDOM, oldComponent, oldDOM, container);
	} else {
		// 非同一组件, 渲染新组建，卸载原组件
		mountElement(virtualDOM, container, oldDOM);
	}
}

function isSaveComponent (virtualDOM, oldComponent) {
	return oldComponent && virtualDOM.type === oldComponent.constructor;
}