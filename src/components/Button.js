import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
//
	render() {
		return (
		<button 
			className={this.props.classes} 
			onClick={this.props.onClick} 
			type={this.props.type}
			value={this.props.value}
			>
			<FontAwesomeIcon icon={this.props.icon ? this.props.icon : 'sync-alt'} />
			{this.props.text}
		</button>
		);
	}
}

export default Button;