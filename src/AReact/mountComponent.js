import isFunctionComponent from "./isFunctionComponent";
import mountElement from "./mountElement";

/**
 * @name: 挂载组件转换成真实dom ，追加到容器中
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @param {*} container
 * @return {*}
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
	// 用于保存函数组件或者类组件返回的 virtualDOM
	let nextVirtualDOM = null

	// 用于类组件在调用时如果传入了ref参数，将类组件实例保存在这里，作为ref的回调传递给调用者
	let component = null;
	// 判断类组件或是函数组件
	if (isFunctionComponent(virtualDOM)) {
		// 函数组件
		nextVirtualDOM = buildFunctionComponent(virtualDOM);
	} else {
		// 类组件
		nextVirtualDOM = buildClassComponent(virtualDOM);
		component = nextVirtualDOM.component;
	}


	// 返回的虚拟dom  nextVirtualDOM 可能依然是组件，所以调用mountElement
	mountElement(nextVirtualDOM, container, oldDOM);

	if (component) {
		console.log(component.props)

		component.componentDidMount();
		if (component.props && component.props.ref) {
			component.props.ref(component);
		}
	}
}


/**
 * @name: 返回函数组件执行后返回的虚拟dom
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @return {*}
 */
function buildFunctionComponent(virtualDOM) {
	return virtualDOM.type(virtualDOM.props || {});
}

/**
 * @name: 返回类组件执行后返回的虚拟dom
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @return {*}
 */
function buildClassComponent(virtualDOM) {
	// virtualDOM.type 保存了 类, 先进行实例化
	const component = new virtualDOM.type(virtualDOM.props || {});
	const nextVirtualDOM = component.render();

	// 将组建实例 挂载到虚拟dom并随虚拟dom一起挂载到真实dom上。
	// 配合mountNativeElement便于在组件发生数据更新时，找到要更新的dom元素
	nextVirtualDOM.component = component;
	return nextVirtualDOM;
}