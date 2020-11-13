import isFunction from './isFunction';
import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container, oldDOM) {
	if (isFunction(virtualDOM)) {
		// 处理组件
		mountComponent(virtualDOM, container, oldDOM);
	} else {
		// 处理普通html元素
		mountNativeElement(virtualDOM, container, oldDOM);
	}

}