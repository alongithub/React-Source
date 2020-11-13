import diff from './diff';

/**
 * @name: 将虚拟dom转换为真实dom并挂载到目标dom内。如果有旧的真实dom，就做对比来更新dom
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM 虚拟dom
 * @param {*} container 转化成真实dom后要挂载到的目标dom
 * @param {*} oldDOM 之前挂载的真实dom，如果存在 进行dom对比，不存在直接挂载.  可以通过container.firstChild 获取到之前挂载的元素
 * @return {*}
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
	diff(virtualDOM, container, oldDOM);
}