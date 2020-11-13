import diff from "./diff";

export default class Component {
	constructor(props) {
		this.props = props;
	}

	setState(state) {
		// this 执行子类的实例
		this.state = Object.assign({}, this.state, state);
		// 获取到最新的virtualDOM
		let virtualDOM = this.render();

		// 获取旧的virtualDOM进行比对
		let oldDOM = this.getDOM();
		let oldVirtualDOM = oldDOM._virtualDOM;
		diff(virtualDOM, oldDOM.parentNode, oldDOM);
	}

	setDOM(dom) {
		this._dom = dom;
	}

	getDOM() {
		return this._dom;
	}

	updateProps(props) {
		this.props = props;
	}

	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(nextProps) {}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state
	}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, preState) {}
	componentWillUnmount() {}

}