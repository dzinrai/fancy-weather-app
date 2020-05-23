import React, { useState, useEffect } from 'react';

function ErrorLog(props) {
	let error;
	if (props.error) error = props.error.statusText;
	return (
		<div className="error__log">
			{error}
		</div>
	);

}

export default ErrorLog;