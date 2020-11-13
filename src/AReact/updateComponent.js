import diff from "./diff";

/**
 * @name: 更新同一组件
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @param {*} oldComponent
 * @param {*} oldDOM
 * @param {*} container
 * @return {*}
 */
export default function updataComponent(virtualDOM, oldComponent, oldDOM, container) {
	oldComponent.componentWillReceiveProps(virtualDOM.props);
	if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
		// 未更新前的props
		let prevProps = oldComponent.props;
		oldComponent.componentWillUpdate(virtualDOM.props);
		// 更新组件的props
		oldComponent.updateProps(virtualDOM.props);

		let nextVirtualDOM = oldComponent.render();
		// 更新 实例
		nextVirtualDOM.component = oldComponent;
		diff(nextVirtualDOM, container, oldDOM);
		oldComponent.componentDidUpdate(prevProps);
	}
	
}