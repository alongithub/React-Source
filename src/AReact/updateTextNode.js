/**
 * @name: 更新文本节点
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @param {*} oldVirtralDOM
 * @param {*} oldDOM
 * @return {*}
 */
export default function updateTextNode(virtualDOM, oldVirtralDOM, oldDOM) {
	if (virtualDOM.props.textContent !== oldVirtralDOM.props.textContent) {
		oldDOM.textContent = virtualDOM.props.textContent;
		oldDOM._virtualDOM = virtualDOM;
	}
}