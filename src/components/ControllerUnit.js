import React from 'react';

/**
 * 控制组件
 */
export default class ControllerUnit extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();

		let index = this.props.index;
        if (this.props.arrange.center) {
            this.props.inverseFunc(index)();
        } else {
            this.props.centerFunc(index)();
        }
	}


	render() {
		let className = 'controller-unit' + (this.props.arrange.inverse ? ' inverse' : '') + (this.props.arrange.center ? ' center' : '');

		return (
			<span className={className} onClick={this.handleClick}></span>
		);
	}
}