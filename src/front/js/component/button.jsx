import React, { Fragment } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const OurButton = props => {
	const className = "btn-button " + props.hide;

	return (
		<>
			<button onClick={props.click} className={className}>
				{props.title}
			</button>
		</>
	);
};

OurButton.propTypes = {
	title: PropTypes.string,
	click: PropTypes.func,
	hide: PropTypes.string
};
