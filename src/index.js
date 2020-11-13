import AReact from './AReact';

const virtuaDom = (
	<div className="container">
		<h1>hello ARreact</h1>
		<h2 data-test="test">(final kill)</h2>
		<div>
			嵌套1 <div>嵌套1.1</div>
		</div>
		<h3>(watch: here will be change)</h3>
		{
			2 === 1 && <div>假如 2 === 1 这里会被渲染</div>
		}
		{
			2 === 2 && <div>假如 2 === 2 这里会被渲染</div>
		}
		<span>here is text content</span>
		<button onClick={() => alert("点击的按钮")}>测试onClick 点击事件</button>
		<h3>
			here will be delete
		</h3>
		2, 3
		<input type="text" value="13"/>
	</div>
);


const virtuaDom2 = (
	<div className="container">
		<h1>hello ARreact</h1>
		<h2 data-test="test123">(final kill)</h2>
		<div>
			嵌套1 <div>嵌套1.1</div>
		</div>
		<h3>(watch: here will be change)</h3>
		{
			2 === 1 && <div>假如 2 === 1 这里会被渲染</div>
		}
		{
			2 === 2 && <div>假如 2 === 2 这里会被渲染</div>
		}
		<span>here is text content 被修改</span>
		<button onClick={() => alert("点击的按钮！！！！")}>测试onClick 点击事件</button>
		<h6>
			h6 here will be delete
		</h6>
		<input type="text" value="13"/>
	</div>
);



function Header (props) {
	return 
}

class Input extends AReact.Component {
	render () {
		return <span> &hearts; {this.props.title}</span>
	}
}

function Wrapper() {
	return <div>wrapper<Header title="后台管理系统"/></div>;
}

class Alert extends AReact.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 20,
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({
			num: this.state.num + 1
		})
	}

	render () {
		// TODO 组件内用了另一个组件更新后 Header 变成了两个hello
		return <div>
			<Input title="title" ref={header => this.header = header}/>
			<button onClick={() => {
				console.log(this.header);
			}}>打印ref 组件Header</button>
			HELLO  {this.props.title} {this.state.num}
			<button onClick={this.handleClick}>增加</button>
			<br/>
			<input ref={input => {this.input = input}}/>
			<button onClick={() => {
				console.log(this.input.value);
			}}>获取input内容</button>
		</div>
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps', nextProps);
	}

	// shouldComponentUpdate(nextProps) {
	// 	return false;
	// }

	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate() {
		console.log('componentWillUpdate');
	}

	componentDidUpdate() {
		console.log('componentDidUpdate')
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
}



// AReact.render(virtuaDom, document.getElementById('app'));
// AReact.render(<Alert title="title"/>, document.getElementById('app'));


// setTimeout(() => {
// 	AReact.render(virtuaDom2, document.getElementById('app'));
// }, 5000)

// setTimeout(() => {
// 	AReact.render(<Alert title="title23"/>, document.getElementById('app'));
// }, 2000)


class KeyDemo extends AReact.Component {
	constructor(props) {
		super(props);
		this.state = {
			persons: [
				{
					id: 1,
					name: 'along1'
				},
				{
					id: 2,
					name: 'along2'
				},
				{
					id: 3,
					name: 'along3'
				},
			]
		}
		this.handleClick = this.handleClick.bind(this);
		this.additem = this.additem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	handleClick() {
		const persons = this.state.persons;
		const item = persons.shift();
		persons.push(item);
		this.setState({
			persons
		});

	}

	deleteItem() {
		const persons = this.state.persons;
		persons.splice(1, 1);
		this.setState({
			persons
		});
	}

	additem () {
		const persons = this.state.persons;
		const id = parseInt(Math.random() * 100000, 10)
		persons.splice(1, 0, {id, name: `along${id}`});
		this.setState({
			persons
		});
	}

	render() {
		return <ul>
			{this.state.persons.map(person => {
				return <li key={person.id}>{person.name}<Alert/></li>
			})}
			<button onClick={this.handleClick}>按钮</button>
			<button onClick={this.additem}>新增</button>
			<button onClick={this.deleteItem}>删除</button>
		</ul>
	}
}

AReact.render(<KeyDemo/>, document.getElementById('app'));