import React from 'react';

class DropButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
//
	render() {
		return (
		<select id="langs" name="langs" className={this.props.classes}>
			<option value="EN">EN</option>
			<option value="RU">RU</option>
			<option value="BY">BY</option>
		</select> 
		);
	}
}

export default DropButton;