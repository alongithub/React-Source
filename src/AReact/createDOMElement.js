import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';


/**
 * @name: 将html类型的虚拟dom转换成真实dom
 * @test: test font
 * @msg: 
 * @param {*} virtualDOM
 * @return {*}
 */
export default function createDOMElement(virtualDOM) {
	let newElement = null;
	if (virtualDOM.type === 'text') {
		// 文本节点
		newElement = document.createTextNode(virtualDOM.props.textContent);
	} else {
		// 元素节点
		newElement = document.createElement(virtualDOM.type);

		// 为节点添加属性,绑定事件，设置value,checked等
		updateNodeElement(newElement, virtualDOM);
	}

	newElement._virtualDOM = virtualDOM;

	// 递归创建子节点，并将子节点填加到newElement中
	virtualDOM.children.forEach(child => {
		mountElement(child, newElement);
	})

	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(newElement);
	}

	return newElement
}